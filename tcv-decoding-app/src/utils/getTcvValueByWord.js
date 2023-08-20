import tcvValueMapping from "./tcvValueMapping";

const getTcvValueByWord = word => {
    let sum = 0;
    word?.split('')?.forEach(char=>{
        sum = sum + (tcvValueMapping?.[char] ? tcvValueMapping?.[char] : 0)
    })
    return sum
}

export default getTcvValueByWord;