const gorillaImages = {
    img1: {
        path: "./images/gorilla/image_part_001.jpg",
    },
    img2: {
        path: "./images/gorilla/image_part_002.jpg",
    },
    img3: {
        path: "./images/gorilla/image_part_003.jpg",
    },
    img4:{
        path: "./images/gorilla/image_part_004.jpg",
    },
   
  };

/**
 * @function loadRestaurantImagesIntoTiers
 * @description For each restaurant of Restaurants, creates a restaurant <img>
 *              you can drag into any tier container
 */
const loadImagesIntoPuzzle= function () {
    let newElt; 
    //select all tiers 

    let tier = document.querySelector('.main'); 

    let tierContainer =  tier.getElementsByClassName("imageContainer")[0]; //unknown tier is chosen tier 
    console.log("image container: ", document.querySelector('.imageContainer'));
    console.log("tierContainer: ", tier.getElementsByClassName("imageContainer")[0]);
    // loop through the Restaurants object and for every key, set the source of image to the path value
    for (let gorillaImage in gorillaImages){
      // create an image element and set it equal to newElt
      newElt = document.createElement("img")
      // the source of each img element is the path indicated in the Restaurants object 
      newElt.src = gorillaImages[gorillaImage].path; 
      // set the id of the new element as the rest key 
      newElt.id = gorillaImage;
      console.log("newElt: ", newElt);
      newElt.setAttribute('draggable', true);
      // append the images to the tier container, which in this case is the unknown tier container 
      tierContainer.appendChild(newElt); 
      //make image draggable 
      newElt.ondragstart = (e)=>{
        e.dataTransfer.setData("text/plain", e.target.id);
        console.log("target.id ", e.target.id);
      };
    }
     
  };

/**
 * @function  createTierDropzones
 * @description turn each .tier-container into a droppable zone
 */



 /*const createPiecesDropzones = function () {
    const puzzleParts = document.querySelectorAll('.tier-container');
    console.log("tier-containers: " + puzzleParts);
    for (let part of puzzleParts){
      // drop image (data) to each tier
      console.log("part: ", part);
      part.ondrop = (e)=>{
        e.preventDefault();
        // each tier is a droppable zone, attach data (image) to tier 
        const data = e.dataTransfer.getData("text/plain");
        console.log("data: ",data);
        e.target.appendChild(document.getElementById(data));
      }
      part.ondragover = (e)=>{ // images will be dragged over the tiers  
        e.preventDefault();
      }
 
    }

    
};*/

loadImagesIntoPuzzle();
