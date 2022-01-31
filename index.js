 
const hexInput=document.getElementById('hexinput')
const inputColor=document.getElementById("inputcolor")
const sliderText= document.getElementById("sliderText")
const slider=document.getElementById("slider")
const alteredColor=document.getElementById("alteredColor")
const alteredColorText = document.getElementById('alteredColorText');

const lightenText=document.getElementById('lightenText')
const darkenText=document.getElementById('darkenText')
const toggleBtn=document.getElementById('toggleBtn')

toggleBtn.addEventListener('click',()=>{
  if(toggleBtn.classList.contains('toggled'))
  {
    toggleBtn.classList.remove('toggled')
    lightenText.classList.remove('unselected')
    darkenText.classList.add('unselected')
  }
  else
  {
    toggleBtn.classList.add('toggled')
    lightenText.classList.add('unselected')
    darkenText.classList.remove('unselected')
  }
  reset()
}
)

hexInput.addEventListener("keyup", () =>{

    const hex=hexInput.value;
    if(!isValidHex(hex))
    return;

    const strripedHex=hex.replace('#','');

    inputColor.style.backgroundColor="#"+strripedHex ;

    reset()
})



const isValidHex=(hex) =>
{
    if(!hex)
    return false;
    
    const strripedHex=hex.replace('#','');
    return strripedHex.length==3|| strripedHex.length==6;
}

//console.log(isValidHex('#000000'))



const convertHextoRGB=(hex)=>
{
    if(!isValidHex)
    return null;

    let strippedHex=hex.replace('#','');

    if(strippedHex.length===3)
    {
        stripped=strippedHex[0]+strippedHex[0]
        +strippedHex[1]+strippedHex[1]
        +strippedHex[2]+strippedHex[2]
    }
      const r=parseInt (strippedHex.substring(0,2),16);
      const g=parseInt(strippedHex.substring(2,4),16);
      const b=parseInt(strippedHex.substring(4,6),16);

//      const b=parseInt(strippedHex.substring(4,6),16);
        
      return {r,g,b}

}

console.log(convertHextoRGB("123"));

const convertRGBToHex = (r,g,b) => {
    const firstPair = ("0" + r.toString(16)).slice(-2);
    const secondPair = ("0" + g.toString(16)).slice(-2);
    const thirdPair = ("0" + b.toString(16)).slice(-2);    
    const hex = "#" + firstPair + secondPair + thirdPair;
    return hex;
  }
   
  
const alterColor = (hex, percentage) => {
    const {r, g, b} = convertHextoRGB(hex);
    
    const amount = Math.floor((percentage/100) * 255);
    
    const newR = increaseWithin0To255(r,amount);
    const newG = increaseWithin0To255(g,amount);
    const newB = increaseWithin0To255(b,amount)
    return convertRGBToHex(newR, newG, newB);
  }
  
  const increaseWithin0To255 = (hex, amount) => {
      //  const newHex = hex + amount;
      //  if(newHex > 255) return 255;
      //  if(newHex < 0) return 0;
      //  return newHex;
    return Math.min(255, Math.max(0, hex + amount));
  }
  
  alterColor("de5254", 10)
  
  slider.addEventListener('input', () => {
    if(!isValidHex(hexInput.value)) return;
    
    sliderText.textContent = `${slider.value}%`;

    const valueAddition  = toggleBtn.classList.contains('toggled') ? 
    -slider.value 
    : slider.value;
    const alteredHex = alterColor(hexInput.value, valueAddition);
    alteredColor.style.backgroundColor = alteredHex;
    alteredColorText.innerText = `Altered Color ${alteredHex}`; 
  })
  



  const reset= () =>{

    slider.value=0
    sliderText.innerText='0%'  
    alteredColor.style.backgroundColor=hexInput.value
    alteredColorText.innerText = `Altered Color ${hexInput.value}`; 

  }