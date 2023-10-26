const url = "https://one00x-data-analysis.onrender.com/assignment"

const mostUsed = (data) => {
    // console.log(data)
    const countMap = {}
    data.forEach(e => {
        countMap[e] = !countMap[e] ? 1 : countMap[e]+1
    });

    let mostUsed=[], max=0;
    for(const word in countMap){
        if(countMap[word] > max){
            mostUsed = [word]
            max = countMap[word]
        }
        else if(countMap[word] === max)
            mostUsed.push(word)
    }
    console.log("Most used words:")
    console.log(mostUsed)
    return mostUsed
}

async function getData(){
    const res = await fetch(`${url}?email=shmmaji@gmail.com`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      })
    return res
}

async function submitAnswer(id,answer){
    // console.log(id,answer)
    const res = await fetch(url , {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            assignment_id : id,
            answer : answer
        })
      })  
    return res
    //   const data = await res.json()
    //   console.log(data) 
}

const dataAnalysis = async() =>{
    try{
        const res = await getData();
        const data = await res.json()
        if(res.status===500){
            throw new Error("Error: HTTP 500, Please retry");
        }
        const id = res.headers.get('x-assignment-id')
        mostUsed(data).forEach(async (word)=>{
            const res = await submitAnswer(id,word)
            const resData = await res.json()
            console.log(`\nSubmit answer for "${word}":`)
            console.log(resData)
        })
    }
    catch(e){
        throw new Error(e);
    }
}

dataAnalysis();