const cursor=document.querySelector('.cursor')
const goes=document.getElementById("goes")
function fade() {
  gsap.to(document.body, {
    opacity: 0,
    background: '#1d1d1d',
    duration: 0.5,
    onComplete: () => {
      window.location = '../';
    },
  });
}

const fuckit=(name,dec)=>{
  goes.querySelector('a').href=`../misc/pdf/${name}.pdf`
  goes.querySelector('.div p').innerHTML=dec
  goes.querySelector('img').src=`../img/pdcov/${name}.png`
}
const down=()=>{
  goes.style.height=0
}
const up=()=>{
  goes.style.height='100vh'
}

function getCookie(name) {
  let cookies = document.cookie.split("; ");
  for (let cookie of cookies) {
      let [key, value] = cookie.split("=");
      if (key === name) return value;
  }
  return null; // Cookie not found
}

function setPhaserCookie(value) {
  let date = new Date();
  date.setTime(date.getTime() + (90 * 60 * 1000)); // 90 minutes from now
  let expires = "expires=" + date.toUTCString();
  document.cookie = "phaser=" + value + "; " + expires + "; path=/";
}

const checkCookie=()=>{
  if (getCookie("phaser")==='3') {
    document.querySelector('.white').style.display='none'
  } 
  else {
    gsap.to('.white',{
      width:0,
      duration:1.5,
      onComplete:()=>{document.body.style.overflowY='auto'}
    })
  }
  setPhaserCookie('3')
}
window.onload=()=>{
  GetData().then(d => {
    if (d) {
      const fragment = document.createDocumentFragment(); // Create a fragment to append all new sections
  
      for (let i = 2; i <= Object.keys(d).length + 1; i++) {
        const newP = document.createElement("section");
        newP.setAttribute("class", `s${i}`);
        
        d[`s${i}`].forEach((e) => {
          const div = document.createElement("div");
          div.setAttribute('onclick',`up();fuckit('${e[0]}','${e[4]}')`)
          const img = document.createElement("img");
          div.addEventListener('mousemove', (x) => {
            const cursorSize = cursor.offsetWidth / 2;
            cursor.innerHTML=e[2]
            let mouseX = x.clientX;
            let mouseY = x.clientY;
          
            let windowWidth = window.innerWidth;
            let posX = Math.min(Math.max(mouseX, cursorSize), windowWidth - cursorSize);
          
            gsap.to(cursor, {
              display:'block',
              x: posX - cursorSize,  // Centering the cursor
              y: mouseY,  
              duration: 0.1,
              ease: "power1.out"
            });
          });
          div.addEventListener('mouseleave', () => {
            gsap.to(cursor, {
              display:'none',
              duration: 0.1,
              ease: 'power1.out',
            });
          });
  
          div.setAttribute("data-text", e[2]);
          div.style.setProperty("--color", e[1]);
          div.style.gridArea = e[3];
          img.src = `../img/cover/${e[0]}.png`;
  
          div.appendChild(img);
          newP.appendChild(div);
        });
  
        fragment.appendChild(newP); // Append the newly created section to the fragment
      }
  
      // Append the fragment to the document body at once
      document.body.appendChild(fragment);
    }
  });
  checkCookie()
}
// Fetch the data from JSON
const GetData = async () => {
  try {
    const response = await fetch("../misc/path.json");
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
  }
};



function black(s,path) {
  // document.querySelector()
  s.classList.add('op')
  gsap.to(".white", {
    width: "100vw",
    duration: 1.5,
    onComplete: () => (window.location = `./${path}`),
  });
}