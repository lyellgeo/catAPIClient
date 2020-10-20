
    // var catButton = document.getElementsByClassName('button-get-cat')[0]
    // catButton.addEventListener("click", getCat)

    // function getCat() {

    // axios.get("https://api.thecatapi.com/v1/images/search")
    // .then((response) => {
    //     document.getElementById('cat').src = response.data[0].url;
    //     })
    // }


    axios.defaults.headers.common['x-api-key'] = "0a814828-8580-4bf2-9919-7c1779573435" 

    var votesData = []

    class CatVoter {

        constructor() {

        }

        getCat = () => {

            axios.get("https://api.thecatapi.com/v1/images/search")
            .then((response) => {
            this.url = response.data[0].url
            this.id = response.data[0].id
            console.log(this)
            this.render();
            });

        }

        voteUp = () => {
            let body = {
                  image_id: this.id,
                  value: 1 
              }
            axios.post('https://api.thecatapi.com/v1/votes', body);
            this.getCat()
            this.getVotes()
        }

        voteDown = () => {
            let body = {
                  image_id: this.id,
                  value: 0 
              }
            axios.post('https://api.thecatapi.com/v1/votes', body);
            this.getCat()
            this.getVotes()
        }

        getVotes = () => {
            axios.get("https://api.thecatapi.com/v1/votes")
                .then((response) => {
                        console.log(response)
                        votesData = response.data
                        votesData.forEach((item) => {
                            item.url = "blank"
                        })
                    }   
                ).then(
                    () => {this.updateVotesURL()}
                )
        }

        updateVotesURL = () => {
            votesData.forEach((item) => {
            var url = "https://api.thecatapi.com/v1/images/" + item.image_id
            axios.get(url)
                .then((response) => {
                item.url = response.data.url
                })
            })

        }

        makeImage = (item) => {
            var img = new Image()
            img.src = item.url
            img.alt = "Cat Image";
            img.className = "gallery--image"
            document.getElementById('vote-gallery').appendChild(img)
        }

        displayGallery = () => {
            votesData.forEach((item) => this.makeImage(item)
            )

        }

        render = () => {
            //change image to new cat
            document.getElementById('cat').src = this.url;

        }

    }

    
    const cat = new CatVoter()
    cat.getCat()
    cat.getVotes()
    cat.updateVotesURL()

    const catButton = document.getElementsByClassName('button-get-cat')[0];
    catButton.addEventListener("click", cat.getCat)

    const upButton = document.getElementsByClassName('button-like')[0];
    upButton.addEventListener("click", cat.voteUp)

    const downButton = document.getElementsByClassName('button-dislike')[0];
    downButton.addEventListener("click", cat.voteDown)

    const displayButton = document.getElementsByClassName('button-display')[0];
    displayButton.addEventListener("click", cat.displayGallery)








