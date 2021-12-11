
 const createPiecesDropzones = function () {
    const puzzleParts = document.querySelectorAll('.piece');
    console.log("tier-containers: " + puzzleParts);
    const imagePlaceholder = document.querySelector('.imageContainer');
    console.log("imageContainer: " + imagePlaceholder);
    for ( part of puzzleParts){
      // drop image (data) to each tier
      console.log("part: ", part);
      part.ondrop = (e)=>{
        console.log("HERE");
        e.preventDefault();
        // each tier is a droppable zone, attach data (image) to tier 
        console.log("HERE");
        const data = e.dataTransfer.getData("text/plain");
        console.log("data: ",data);
        e.target.appendChild(document.getElementById(data));
        //imagePlaceholder.appendChild(document.getElementById(data));
      }
      part.ondragover = (e)=>{ // images will be dragged over the tiers  
        e.preventDefault();
      }
 
    }

    
};

const reset = document.getElementById('reset');
reset.addEventListener("click", function (e) {
  const images = document.getElementsByClassName('image'); //get the images from HTML 
  let tier = document.querySelector('.main');
  let tierContainer =  tier.getElementsByClassName("imageContainer")[0]; // this is the image tier containter 
    for (im in gorillaImages){
      let tempIm = document.getElementById(im);
      tierContainer.appendChild(tempIm);  // append image to image tier container
      
    }

  }
  
);
createPiecesDropzones();