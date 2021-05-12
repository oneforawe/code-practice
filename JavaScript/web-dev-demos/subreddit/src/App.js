import React, {useEffect} from "react";
import {useStickyState} from "./CustomHooks";
import Time from './Time.js';
import logo from './reddit-logo-16.png';
import './App.css';

// Could try getting rid of warnings on useEffect usage (eg, in SubredditList)
// https://www.benmvp.com/blog/helper-functions-react-useeffect-hook/


function App({initSubreddit}) {

  /* Use an array for subreddit so that if the same value is re-entered, the
     useEffect will get triggered to fetch a (fresh) copy of the top posts */
  const [state, setState, resetState] = useStickyState(
    "state-for-subreddit-grabber",
    {
      inputValue: initSubreddit, subredditArr: [initSubreddit], error: null,
      orderByScore: false, enableScoreMod: false, resetScoreMods: false,
      posts: [], postsAlt: [], isLoading: false, applyReordering: false,
    },
    {
      inputValue: '', subredditArr: [''], error: null,
      orderByScore: false, enableScoreMod: false, resetScoreMods: false,
      posts: [], postsAlt: [], isLoading: false, applyReordering: false,
    }
  );

  const setSubState = (property, newValue) => {
    setState( currState => ({...currState, [property]: newValue}) );
  };
  const setInputValue = (newValue) => { setSubState("inputValue", newValue) };
  const setSubreddit  = (newValue) => { setSubState("subredditArr", [newValue]) };
  const setError      = (newValue) => { setSubState("error", newValue) };
  const setPosts      = (newValue) => { setSubState("posts", newValue) };
  //const setPostsAlt   = (newValue) => { setSubState("postsAlt", newValue) };
  const toggleBoolean = (property) => {
    setState( currState => ({...currState, [property]: !state[property]}) )
  };
  const localVote = (state, setSubState, index, postID, change) => {
    // score modification ("ScoreMod") by modifying local votes (localUps/Downs)
    const {orderByScore, enableScoreMod, resetScoreMods, posts} = state;
    if (enableScoreMod && !resetScoreMods) {
      let idxForPosts;
      const isRightPost = (post) => (post.id === postID);
      if (orderByScore) {
        idxForPosts = posts.findIndex(isRightPost);
      } else {
        idxForPosts = index;
      };
      if (change > 0) {
        let postsNew = posts;
        postsNew[idxForPosts].localUps += change;
        postsNew[idxForPosts].localScore += change;
        setSubState("posts", postsNew);
      };
      if (change < 0) {
        let postsNew = posts;
        postsNew[idxForPosts].localDowns -= change;
        postsNew[idxForPosts].localScore += change;
        setSubState("posts", postsNew);
      };
      setState( currState => ({...currState, applyReordering: true}) );
    }
  };
  const handleInput = e => {
    e.preventDefault();
    setError(null);
    setSubreddit(state.inputValue);
  };
  const handleReset = e => {
    resetState();
  };

  useEffect(() => {
    if (state.applyReordering) {
      const orderingProperty = state.enableScoreMod ? "localScore" : "score";
      setState( currState => ({...currState,
        postsAlt: reorderArray(state.posts, orderingProperty),
        applyReordering: false
      }) );
    };
  }, [state.applyReordering]);

  useEffect(() => {
    /* Need to apply reordering, for example, when ordered by score and
       deactivating score mods, so that displayed scores change */
    setState( currState => ({...currState, applyReordering: true}) );
  }, [state.enableScoreMod]);

  useEffect(() => {
    if (state.resetScoreMods) {
      setState( currState => ({...currState, posts:
        state.posts.map(post => {
          post.localUps = 0;
          post.localDowns = 0;
          post.localScore = post.score;
          return post;
        })
      }));
      setState( currState => ({...currState, applyReordering: true}) );
    };
  }, [state.resetScoreMods]);

  let subreddit = state.subredditArr[0];

  return (
    <div className="App">
      <h1><img src={logo} className="App-logo" alt="logo"/>{" "}
        Subreddit Grabber</h1>
      <form className="App-form" onSubmit={handleInput} onReset={handleReset}>
        <label>
          Subreddit: <input value={state.inputValue}
            onChange={e => setInputValue(e.target.value)}/>
        </label>
        <button type="reset">Reset</button>
      </form>
      <hr/>
      <div className="subreddit">
        <a href={`https://www.reddit.com/r/${subreddit}`}>
          /r/{subreddit}
        </a>
      </div>
      <SubredditControls
        toggle={toggleBoolean}/>
      <hr/>
      <SubredditList
        state={state}
        setError={setError}
        setPosts={setPosts}
        toggle={toggleBoolean}
        setSubState={setSubState}
        localVote={localVote}/>
    </div>
  );
};

const SubredditControls = ({toggle}) => {
  return (
    <div className="subreddit-controls-form">
      <label className="subreddit-controls-item">
        <input type="checkbox" name="order-by-score"
          onChange={() => toggle("orderByScore")}>
        </input> order by score</label>
      <label className="subreddit-controls-item">
        <input type="checkbox" name="enable-score-mod"
          onChange={() => toggle("enableScoreMod")}>
        </input> enable temporary score modification</label>
      <label className="subreddit-controls-item">
        <input type="checkbox" name="reset-score-mod"
          onChange={() => toggle("resetScoreMods")}>
        </input> reset score modification</label>
    </div>
  );
};

const SubredditList = ({
  state,
  setError,
  setPosts,
  toggle,
  setSubState,
  localVote
}) => {
  let postsDisplay = [];
  const {subredditArr, error, orderByScore, posts, postsAlt, isLoading} = state;

  useEffect(() => {
    let subreddit = subredditArr[0];
    setSubState("isLoading", true);
    fetch(`https://www.reddit.com/r/${subreddit}.json`)
    .then(resp => {
      if (!resp.ok) { throw new Error('Could not fetch posts'); };
      return resp;
    })
    .then(resp => resp.json())
    .then(json => {
      setPosts(json.data.children.map(c => getPostSubsetEtc(c.data)));
      toggle("applyReordering");
    })
    .catch(err => setError(err.message))
    .finally(() => setSubState("isLoading", false));
  }, [subredditArr]);
  //}, [subreddit, setPosts, toggle, setError, setSubState]);

  if (error) {
    return (
      <div className="subreddit-alert">Not a valid subreddit. Try again.</div>
    );
  };

  if (isLoading) {
    return (
      <div className="subreddit-loading">Loading posts...</div>
    );
  } else {
    postsDisplay = orderByScore ? postsAlt : posts;

    return (
      <ul className="subreddit-list">
        {postsDisplay.map( (post, index) => (
          <li key={post.id} className="subreddit-item">
            <PostDetail state={state} setSubState={setSubState}
              localVote={localVote} index={index} post={post}/>
          </li>
        ))}
      </ul>
    );
  };
};

const PostDetail = ({state, setSubState, localVote, index, post}) => {
  let ifClicky = state.enableScoreMod ? " clicky" : "";
  return (
    <div className="post-container">
      <div className="post-part-left">
        <div className="score-controls">
          <i className={`fas fa-arrow-up${ifClicky}`} onClick={() =>
            localVote(state, setSubState, index, post.id, +1)}></i>
          {state.enableScoreMod ? post.localScore : post.score}
          <i className={`fas fa-arrow-down${ifClicky}`} onClick={() =>
            localVote(state, setSubState, index, post.id, -1)}></i>
        </div>
        <div className="post-thumbnail-container">
          <a href={post.url}>
            <Image thumbnail={post.thumbnail}/>
          </a>
        </div>
      </div>
      <div className="post-part-right">
        <div className="post-title-and-ext-link">
          <span className="post-title">
            <a href={`https://www.reddit.com/${post.permalink}`}>
              {post.title}
            </a>
          </span>
          <span className="post-ext-link">
            <ExtLink link={post.url}/>
          </span>
        </div>
        <div className="post-submission">
          Submitted <Time time={post.created_utc}/> by {" "}
          <span className="post-author">
            <a href={`https://www.reddit.com/user/${post.author}`}>
              {post.author}
            </a>
          </span>
        </div>
        <div className="post-actions">
          <div className="post-action comment-action">
            <a href={post.permalink}>
              <CommentAction numComments={post.num_comments}/>
            </a>
          </div>
          <div className="post-action">share</div>
          <div className="post-action">save</div>
          <div className="post-action">hide</div>
          <div className="post-action">report</div>
          <div className="post-action">pocket</div>
        </div>
      </div>
    </div>
  );
};

const Image = ({thumbnail}) => (
  (thumbnail === "self" || thumbnail === "default" || thumbnail === "nsfw") ?
    <div className="image-icon-background"><i className="fas fa-image"></i></div>
    :
    <img src={thumbnail} alt="thumbnail" className="post-thumbnail"/>
);

const ExtLink = ({link}) => {
  const pathArray = link.split('/');
  const authority = pathArray[2];
  const hostAndPort = (authority.includes('@') ? authority.split('@')[1] : authority);
  const host = (hostAndPort.includes(':') ? hostAndPort.split(':')[0] : hostAndPort);
  const hostname = (host.startsWith('www.') ? host.slice(4) : host);
  return <>{" "}<a href={link}>{hostname}</a></>;
};

const CommentAction = ({numComments}) => (
  (numComments > 0) ?
    <span>{numComments} {(numComments > 1) ? "comments" : "comment"}</span>
    :
    <span>comment</span>
);

const reorderArray = (arrayIn, property) => {
  let array = [...arrayIn];
  // re-order, highest to lowest property-value
  function propertyCompare(post1, post2) {
    const score1 = post1[property];
    const score2 = post2[property];
    let comparison = 0;
    if (score1 > score2) {
      comparison = -1;
    } else if (score1 < score2) {
      comparison = 1;
    }
    return comparison;
  }
  return array.sort(propertyCompare);
};

const getPostSubsetEtc =
  ({id, permalink, title, author, created_utc, url, thumbnail, num_comments, score}) =>
  ({id, permalink, title, author, created_utc, url, thumbnail, num_comments, score,
    localUps: 0, localDowns: 0, localScore: score});


export default App;