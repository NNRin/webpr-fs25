const results = [];
const compareArray = a1 => a2 => {
    for(let i = 0; i < a1.length; i++){
        if(a1[i] !== a2[i]){
            return false;
        }
    }
    return true;
};

results.push(
    ([1,2,3].reduce((a, c) => a+c,0)) === 6
);
results.push(compareArray
    ([3,2,1])
    (
        ([1,2,3].reduce((acc, cur) => {
            acc.unshift(cur);
            return acc;
        },[]))
    )
);


if(results.every(a => a === true)){
    document.writeln("all success");
}else{
    results.forEach((v, i) => {
        if (v === false) {
            document.writeln("test failed: " + i);
        }

    });
}