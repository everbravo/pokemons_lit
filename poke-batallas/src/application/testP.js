class MyClass{
    constructor(){
        console.log("Starting...");
    }

    add(num1, num2){
        return num1 + num2;
    }

    callAnotherFunc(arg1, arg2){
        return this.add(arg1, arg2);
    }
}
module.exports=MyClass;