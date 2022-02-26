function getErrMessage (err: any): string {
  if (err === null) {
    return 'Error is a null object';
  }
  if (err === '') {
    return 'Error is an empty string.';
  }
  if (err?.message) {
    if (err.message === '') {
      return 'Error message is an empty string.';
    }
    return err.message.toString();
  }
  return err.toString();
}


type EntityType =
  'null'
  | 'number-zero' | 'number-nonzero'
  | 'string-empty' | 'string-nonempty'
  | 'array'
  | 'object-without-message'
  | 'object-with-string-message-empty' | 'object-with-string-message-nonempty'
  | 'object-with-array-message'
  | 'function-math' | 'function-custom';


const entityTypeList: Array<EntityType> = [
  'null',
  'number-zero', 'number-nonzero',
  'string-empty', 'string-nonempty',
  'array',
  'object-without-message',
  'object-with-string-message-empty', 'object-with-string-message-nonempty',
  'object-with-array-message',
  'function-math', 'function-custom'
];


function getThrowEntity(entityType: EntityType) {
  let throwEntity: any;
  switch (entityType) {
    case 'null':
      throwEntity = null;
      break;
    case 'number-zero':
      throwEntity = 0;
      break;
    case 'number-nonzero':
      throwEntity = 1;
      break;
    case 'string-empty':
      throwEntity = '';
      break;
    case 'string-nonempty':
      throwEntity = 'Nonempty string entity.';
      break;
    case 'array':
      throwEntity = [1, 2, 3, 4];
      break;
    case 'object-without-message':
      throwEntity = { nonmessage: '' };
      break;
    case 'object-with-string-message-empty':
      throwEntity = { message: '' };
      break;
    case 'object-with-string-message-nonempty':
      throwEntity = { message: 'Nonempty string message.' };
      break;
    case 'object-with-array-message':
      throwEntity = { message: [2, 4, 6, 8] };
      break;
    case 'function-math':
      throwEntity = Math.cos;
      break;
    case 'function-custom':
      throwEntity = function (x: number): number { return x; };
      break;
    default:
      throwEntity = null;
      break;
  }
  return throwEntity;
}


function throwCatchAndReturnErrorMessage (entity: any) {
  try {
    throw new Error(entity);
  }
  catch (error) {
    const message = getErrMessage(entity);
    return message;
  }
}


function testAllEntities () {
  entityTypeList.forEach(entityType => {
    const outputString1 = entityType.padEnd(40, ' ');
    const outputString2 =
      throwCatchAndReturnErrorMessage(getThrowEntity(entityType));
    const outputString = outputString1 + outputString2;
    console.log(outputString);
  })
}


testAllEntities();