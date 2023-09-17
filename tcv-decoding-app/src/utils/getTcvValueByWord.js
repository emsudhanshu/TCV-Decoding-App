import tcvValueMapping from "./tcvValueMapping";

const getTcvValueByWord = word => {
    let sum = 0;
    word?.split('')?.forEach(char=>{
        console.log(char, tcvValueMapping?.[char])
        sum = sum + (tcvValueMapping?.[char] ? tcvValueMapping?.[char] : 0)
    })
    console.log("---- sum", sum)
    return sum
}

export default getTcvValueByWord;