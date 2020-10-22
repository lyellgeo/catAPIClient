
    // var catButton = document.getElementsByClassName('button-get-cat')[0]
    // catButton.addEventListener("click", getCat)

    // function getCat() {

    // axios.get("https://api.thecatapi.com/v1/images/search")
    // .then((response) => {
    //     document.getElementById('cat').src = response.data[0].url;
    //     })
    // }


    axios.defaults.headers.common['x-api-key'] = "0a814828-8580-4bf2-9919-7c1779573435";
    axios.defaults.headers.common['Content-Type'] = 'application/json'; 

    var votesData = [];
    var URLData = []

    class CatVoter {

        constructor() {

        }

        getCat = () => {

            axios.get("https://api.thecatapi.com/v1/images/search")
            .then((response) => {
            this.url = response.data[0].url
            this.id = response.data[0].id
            this.render();
            })
        
        }

        voteUp = () => {
            let body = {
                  image_id: this.id,
                  value: 1 
              }
            axios.post('https://api.thecatapi.com/v1/votes', body);
            this.getCat()
        }

        voteDown = () => {
            let body = {
                  image_id: this.id,
                  value: 0 
              }
            axios.post('https://api.thecatapi.com/v1/votes', body);
            this.getCat()
        }

        getVotes = () => {
            votesData = []
            axios.get("https://api.thecatapi.com/v1/votes?limit=50")
                .then((response) => {
                        votesData = response.data
                        votesData.forEach((item) => {
                            item.url = "https://picsum.photos/seed/picsum/536/354"
                        });
                        this.updateVotesURL();

                    })
        }

        //uses VotesData arr to put url links into the URLData array
        updateVotesURL = () => {
            
            var axiosArr = []
            votesData.forEach((item) => {
            var url = "https://api.thecatapi.com/v1/images/" + item.image_id
            axiosArr.push(axios.get(url))
            })
            axios.all(axiosArr)
            .then((response) => {
                URLData = response;
                for (let i = 0; i < votesData.length; i++) {
                    votesData[i].url = URLData[i].data.url
                }
                this.displayGallery();

            })

        }

        makeImage = (item) => {
            var img = new Image()
            img.src = item.url
            img.alt = "Cat Image";
            img.className = "gallery--image"
            if (item.value > 0) {
                img.className = "gallery--image like"
            } else {
                img.className = "gallery--image dislike"
            }
            document.getElementById('vote-gallery').appendChild(img)
        }

        displayGallery = () => {
            votesData.forEach((item) => this.makeImage(item)
            )

        }

        deleteAllVotes = () => {
            votesData.forEach((item) => {
                var url = "https://api.thecatapi.com/v1/votes/" + item.id
                axios.delete(url)
                .then((response) => {console.log(response)})
            })
            
            
        }
        //same functionality as deleteAllvotes, but uses axios.all to send all delete requests at once

        deleteAllVotes2 = () => {
            var axiosArr = []
            votesData.forEach((item) => {
             var url = "https://api.thecatapi.com/v1/votes/" + item.id;
                axiosArr.push(axios.delete(url))
            })
            axios.all(axiosArr).then((response) => {
                console.log(response)
                votesData = []
            })

        }

        render = () => {
            //change image to new cat
            document.getElementById('cat').src = this.url;
            

        }

    }

    
    const cat = new CatVoter()

    cat.getCat()


    const upButton = document.getElementsByClassName('button-like')[0];
    upButton.addEventListener("click", cat.voteUp)

    const downButton = document.getElementsByClassName('button-dislike')[0];
    downButton.addEventListener("click", cat.voteDown)

 //   const displayButton = document.getElementsByClassName('button-display')[0];
 //   displayButton.addEventListener("click", cat.displayGallery)








