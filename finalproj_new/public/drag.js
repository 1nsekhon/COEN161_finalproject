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


const loadImagesIntoPuzzle= function () {
  let newElt; 

  let tier = document.querySelector('.main'); 

  let tierContainer =  tier.getElementsByClassName("imageContainer")[0]; 
  console.log("image container: ", document.querySelector('.imageContainer'));
  console.log("tierContainer: ", tier.getElementsByClassName("imageContainer")[0]);
  
  for (let gorillaImage in gorillaImages){
 
    newElt = document.createElement("img")
  
    newElt.src = gorillaImages[gorillaImage].path; 

    newElt.id = gorillaImage;
    console.log("newElt: ", newElt);
    newElt.classList.add("image");
    newElt.setAttribute('draggable', true);

    tierContainer.appendChild(newElt); 

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

