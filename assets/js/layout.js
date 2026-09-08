(function initialiseSharedLayout(){
  const parts=[
    {selectors:['#header','#header-placeholder'],file:'header.html',name:'header'},
    {selectors:['#sidebar-placeholder','#sidebar-container'],file:'sidebar.html',name:'sidebar'},
    {selectors:['#footer','#footer-placeholder'],file:'footer.html',name:'footer'}
  ];

  async function loadPart(part){
    const target=part.selectors.map(selector=>document.querySelector(selector)).find(Boolean);
    if(!target||target.children.length||target.dataset.layoutLoading==='true')return;
    target.dataset.layoutLoading='true';
    try{
      const response=await fetch(part.file);
      if(!response.ok)throw new Error(`${response.status} ${response.statusText}`);
      target.innerHTML=await response.text();
      target.dataset.layoutLoaded='true';
      if(part.name==='sidebar')setActiveSidebarLink(target);
    }catch(error){
      console.error(`Gagal memuatkan ${part.name}:`,error);
      target.innerHTML=`<div class="alert alert-warning m-3" role="alert">Komponen ${part.name} tidak dapat dimuatkan.</div>`;
    }finally{
      delete target.dataset.layoutLoading;
    }
  }

  function setActiveSidebarLink(root){
    const page=(location.pathname.split('/').pop()||'index.html').toLowerCase();
    root.querySelectorAll('a.nav-link[href]').forEach(link=>{
      const href=(link.getAttribute('href')||'').split('?')[0].toLowerCase();
      if(href===page){link.classList.add('active');link.setAttribute('aria-current','page');}
    });
  }

  function start(){parts.forEach(loadPart);}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});
  else start();
})();
