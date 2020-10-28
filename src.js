

    axios.defaults.headers.common['x-api-key'] = "0a814828-8580-4bf2-9919-7c1779573435";
    axios.defaults.headers.common['Content-Type'] = 'application/json'; 

    var votesData = [];
    var URLData = []

    class CatVoter {

        constructor() {

        }

        getCat = () => {

            axios.get("https://cat-photo-server.herokuapp.com/cat")
            .then((response) => {
            console.log(response.data)
            this.url = response.data.url
            this.id = response.data.id
            this.render();
            this.getVotes();
            })

            
        
        }

        voteUp = () => {
            let body = {
                    url: this.url,
                    image_id: this.id,
                    value: 1,
              }
            axios.post('https://cat-photo-server.herokuapp.com/votes', body);
            this.getCat()
        }

        voteDown = () => {
            let body = {
                    url: this.url,
                    image_id: this.id,
                    value: 0 
              }
            axios.post('https://cat-photo-server.herokuapp.com/votes', body);
            this.getCat()
        }

        getVotes = () => {
            
            axios.get("https://cat-photo-server.herokuapp.com/votes")
                .then((response) => {
                        console.log(response)
                        votesData = response.data
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








