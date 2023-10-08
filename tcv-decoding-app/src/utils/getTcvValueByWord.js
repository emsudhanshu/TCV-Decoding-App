import tcvValueMapping from "./tcvValueMapping";

const getTcvValueByWord = word => {
    let sum = 0;
    let valueBreakup = "";
    let prevChar = '';
    word?.split('')?.forEach(char=>{
        console.log(char, tcvValueMapping?.[char])
        valueBreakup = valueBreakup + ' ' + `(${char})(${tcvValueMapping?.[char]})`;

        if(prevChar == '्' && char == "र"){
            sum = sum + (tcvValueMapping?.[char] ? (tcvValueMapping?.[char] - 2) : 0);
        }
        else{
            sum = sum + (tcvValueMapping?.[char] ? tcvValueMapping?.[char] : 0);
        }

        prevChar = char;
    })
    console.log("---- word",word)
    console.log("---- tcv value", sum);
    console.log('---- valueBreakup', valueBreakup)
    console.log("------------");
    console.log("------------");
    return { sum, valueBreakup }
}

export default getTcvValueByWord;