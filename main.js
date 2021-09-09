document.getElementById('button').addEventListener('click',function(){
    //take search value
const SearchInput=document.getElementById('search-input');
const SearchInputText= SearchInput.value;
//clear input 
SearchInput.value =" ";

reqApi(SearchInputText);

});
//requesting api
const reqApi=(bookName)=>{
const url=`https://openlibrary.org/search.json?q=${bookName}`;
fetch(url)
.then(res=>res.json())
.then(data=>getBookData(data))
}



const getBookData=(booksobj)=>{
  console.log(booksobj)

    const getBookDataArray=booksobj.docs;
     //get valid input
    if(getBookDataArray.length === 0){
    document.getElementById('show-valid').innerText ='Did not find any result,Try another one';
    }
     //get html container div
     const containerDiv=document.getElementById('container-div');
     containerDiv.textContent= '';
    //book result number
    const showResult =booksobj.docs.length;
    const showResultTag = document.getElementById('show-result');
    showResultTag.innerHTML=`Search result : ${showResult}`;
    
    getBookDataArray.forEach(book => {
        
      //clear valid mesege
        document.getElementById('show-valid').innerText='';
    //book name
    const bookName = book.title;

    //book author name
    const bookAuthorName = book.author_name.toString();
    //book publish date
    const bookFirstPub=book.publish_date.toString();
    //image id
     const imageId=book.cover_i;
     //for updating image
     const imageUrl=`https://covers.openlibrary.org/b/id/${imageId}-M.jpg`;

     //showing result


     //create element for diplaying data
     const div=document.createElement('div');
     div.innerHTML=`
     <div class="col rounded-3">
              <div class="card">
                <img src="${imageUrl}" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">Book Name : ${bookName} </h5>
                  <h6 class="card-title">Author Name : ${bookAuthorName} </h6>
                  <p class="card-text">Publish date : ${bookFirstPub}</p>
                  <p class="card-text">To Get information about book please contact with author or publisher</p>
                </div>
              </div>
            </div>
     `
     //append in container div
     containerDiv.appendChild(div);
    
        
    });
   
}