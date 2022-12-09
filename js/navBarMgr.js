window.onload = function() {      

const navBar            = document.getElementById('navbarContainer');
const navBarContent     = document.getElementById('navBarContent');
const brandSheet        = document.getElementsByClassName ('navbar-brand')[0];
//navBar.classList.add('navBarLarge');

console.log('navBarContent '+navBarContent);

window.addEventListener('scroll',(event) => {
    
    if (window.scrollY<150)
    {
      if (navBar.classList.contains('navBarSmall'))
      { navBar.classList.remove('navBarSmall'); 
        }

      if (!navBar.classList.contains('navBarLarge'))
        { navBar.classList.add('navBarLarge');
          navBarContent.classList.add('navBarLarge'); } 
    }
    else
    {
      if (navBar.classList.contains('navBarLarge')){
        { navBar.classList.remove('navBarLarge'); 
          navBarContent.classList.remove('navBarLarge');}

      if (!navBar.classList.contains('navBarSmall'))
        { navBar.classList.add('navBarSmall');
        navBarContent.classList.add('navBarSmall'); }
      }
    }
});

function Myrefresh ()
{
  console.log('Myrefresh')
  setTimeout(function() { Myrefresh(); }, 100);   
}
//setTimeout(function() { Myrefresh(); }, 10);  

function getStyleSheet(unique_title) {
    for (const sheet of document.styleSheets) {
      if (sheet.title === unique_title) {
        return sheet;
      }
    }
  }
}