function solution(genres, plays) {
    // var answer = [];
    // return answer;
    
    const genrePlay = {};
    for (let i=0; i<genres.length; i++){
        genrePlay[genres[i]] = genrePlay[genres[i]]?genrePlay[genres[i]]+plays[i]:plays[i];
    }
    
//     const genrePlayArr = Object.entries(genrePlay);
    
//     genrePlayArr.sort((a,b)=>b[1]-a[1]);
    
//     console.log(genrePlay);
    
    const allSongs = new Array(genres.length);
    
    for (let i=0; i<genres.length; i++){
        allSongs[i]={genre: genres[i], plays: plays[i], idx: i};
    }
    
    allSongs.sort((a, b)=>{
        if (genrePlay[b.genre]===genrePlay[a.genre]){
            return b.plays-a.plays;
        } else {
            return genrePlay[b.genre]-genrePlay[a.genre];
        }
    })
    
    const answer = [];
    let before = "";
    let cnt = 0;
    for (let i=0; i<allSongs.length; i++){
        if (allSongs[i].genre===before){
            cnt++;
            if (cnt>2) continue;
        } else {
            cnt=1;
        }
        answer.push(allSongs[i].idx);
        before = allSongs[i].genre;
    }
    return answer;
}