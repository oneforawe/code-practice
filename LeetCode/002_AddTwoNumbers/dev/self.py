class Foo:
    # foobar = 15
    foobar = 15

    def __init__(self, whatever):
        self.whatever = whatever

    def foo(self):
        print(self.whatever)

    def __str__(self):
        return "HI"


f1 = Foo("HEY")
f2 = Foo("HI")

f1.foo()
f2.foo()
print("\n")
print("Foo.foobar = " + str(Foo.foobar))
print("f1.foobar = " + str(f1.foobar))
print("f2.foobar = " + str(f2.foobar))

f1.foobar = 1
print("\n")
print("f1.foobar set to 1")
print("Foo.foobar = " + str(Foo.foobar))
print("f1.foobar = " + str(f1.foobar))
print("f2.foobar = " + str(f2.foobar))

f2.foobar = 100
print("\n")
print("f2.foobar set to 100")
print("Foo.foobar = " + str(Foo.foobar))
print("f1.foobar = " + str(f1.foobar))
print("f2.foobar = " + str(f2.foobar))

Foo.foobar = 1000
f3 = Foo("HO")
f3.foo()

print("\n")
print("Foo.foobar set to 1000")
print("Foo.foobar = " + str(Foo.foobar))
print("f1.foobar = " + str(f1.foobar))
print("f2.foobar = " + str(f2.foobar))
print("f3.foobar = " + str(f3.foobar))




