import {useEffect,useState} from 'react';
import {perfil,novedades,investigaciones,cursos,premios} from './datos';
const secciones=[
 {id:'news',funcion:'latest_news',etiqueta:'novedades'},
 {id:'research',funcion:'research',etiqueta:'investigación'},
 {id:'teaching',funcion:'teaching',etiqueta:'docencia'},
 {id:'awards',funcion:'awards',etiqueta:'reconocimientos'}
];
const archivo=nombre=>`${import.meta.env.BASE_URL}${nombre}`;
function Enlace({url,children,className}){
 return url?<a className={className} href={url} target="_blank" rel="noopener noreferrer">{children}</a>:<span className={className}>{children}</span>;
}
function Celda({seccion,numero,children}){
 const [abierta,setAbierta]=useState(true);
 return <section id={seccion.id} className="cell" aria-labelledby={`titulo-${seccion.id}`}>
  <div className="input-row"><span className="prompt" aria-hidden="true">In [{numero}]:</span>
   <h2 id={`titulo-${seccion.id}`}><button type="button" aria-expanded={abierta} aria-controls={`salida-${seccion.id}`} onClick={()=>setAbierta(v=>!v)}>
    <code>{perfil.identificador}.{seccion.funcion}()</code><span className={`chevron ${abierta?'':'closed'}`} aria-hidden="true">⌄</span>
   </button></h2>
  </div>
  <div className="output-row" id={`salida-${seccion.id}`} hidden={!abierta}><span className="prompt" aria-hidden="true">Out[{numero}]:</span><div className="output">{children}</div></div>
 </section>;
}
export default function App(){
 const [activa,setActiva]=useState('news');
 const [fotoError,setFotoError]=useState(false);

 const [temaOscuro, setTemaOscuro] = useState(() => {
   try {
     const guardado = localStorage.getItem('tema-pagina');

     if (guardado === 'oscuro') return true;
     if (guardado === 'claro') return false;
   } catch {
     // La página sigue funcionando si no se puede guardar la preferencia.
   }

   return window.matchMedia('(prefers-color-scheme: dark)').matches;
 });

 useEffect(() => {
   const tema = temaOscuro ? 'oscuro' : 'claro';

   document.documentElement.dataset.tema = tema;

   try {
     localStorage.setItem('tema-pagina', tema);
   } catch {
     // Cambiar de tema funciona aunque el almacenamiento esté bloqueado.
   }
 }, [temaOscuro]);
 useEffect(()=>{
  let pendiente=0;
  const actualizar=()=>{
   pendiente=0;
   let actual=secciones[0].id;
   for(const s of secciones)if(document.getElementById(s.id).getBoundingClientRect().top<=window.innerHeight*.35)actual=s.id;
   if(window.scrollY>0&&window.innerHeight+window.scrollY>=document.documentElement.scrollHeight-8)actual='awards';
   setActiva(actual);
  };
  const programar=()=>{if(!pendiente)pendiente=requestAnimationFrame(actualizar)};
  actualizar();
  window.addEventListener('scroll',programar,{passive:true});window.addEventListener('resize',programar);
  const observer=new ResizeObserver(programar);observer.observe(document.querySelector('main'));
  return()=>{window.removeEventListener('scroll',programar);window.removeEventListener('resize',programar);observer.disconnect();cancelAnimationFrame(pendiente)};
 },[]);
 return <div className="page">
  <button
  type="button"
  className="theme-toggle"
  onClick={() => setTemaOscuro(actual => !actual)}
>
  <span aria-hidden="true">
    {temaOscuro ? '☀' : '☾'}
  </span>

  <span>
    {temaOscuro ? 'Modo claro' : 'Modo oscuro'}
  </span>
</button>
  <a className="skip" href="#contenido">Saltar al contenido</a>
  <header className="hero">
   <div className="portrait">{perfil.foto&&!fotoError?<img src={archivo(perfil.foto)} alt={`Retrato de ${perfil.nombre}`} onError={()=>setFotoError(true)} width="180" height="180"/>:<span aria-label="Espacio para tu fotografía">{perfil.iniciales}</span>}</div>
   <div className="bio"><h1>{perfil.nombre}</h1><p className="affiliation">{perfil.cargo}, {perfil.institucion}</p>
    <div className="primary-links">{perfil.cv&&<Enlace url={archivo(perfil.cv)}>CV</Enlace>}{perfil.scholar&&<Enlace url={perfil.scholar}>Google Scholar</Enlace>}<a className="email" href={`mailto:${perfil.email}`}>{perfil.email}</a></div>
    <div className="socials">{[['GitHub',perfil.github],['X',perfil.x],['LinkedIn',perfil.linkedin]].filter(([,url])=>url).map(([nombre,url])=><Enlace key={nombre} url={url}>{nombre}</Enlace>)}</div>
    <div className="biography">{perfil.biografia.map((p,i)=><p key={i}>{p}</p>)}</div>
   </div>
  </header>
  <nav className="toc" aria-label="Secciones de la página">{secciones.map(s=><a key={s.id} href={`#${s.id}`} aria-current={activa===s.id?'location':undefined}>{s.etiqueta}</a>)}</nav>
  <main id="contenido">
   <Celda seccion={secciones[0]} numero={1}><ul className="news">{novedades.map((n,i)=><li key={i}><span className="date">{n.fecha}</span><span>{n.antes}<Enlace url={n.url} className="accent">{n.destacado}</Enlace>{n.despues}</span></li>)}</ul></Celda>
   <Celda seccion={secciones[1]} numero={2}>{investigaciones.map((p,i)=><article className="paper" key={i}><h3><Enlace url={p.url}>{p.titulo}</Enlace></h3><p>{p.descripcion}</p><p className="metadata">{p.autores}. {p.medio}</p></article>)}{perfil.scholar&&<Enlace className="more" url={perfil.scholar}>... más en Google Scholar</Enlace>}</Celda>
   <Celda seccion={secciones[2]} numero={3}><div className="courses">{cursos.map((c,i)=><article className="course" key={i}><p className="date">{c.fecha}</p><h3><Enlace url={c.url}>{c.titulo}</Enlace></h3><p>{c.institucion}</p><p>{c.descripcion}</p></article>)}</div></Celda>
   <Celda seccion={secciones[3]} numero={4}><ul className="awards">{premios.map((p,i)=><li key={i}><Enlace url={p.url}>{p.nombre}</Enlace><span className="date"> {p.fecha}</span></li>)}</ul></Celda>
  </main>
  <footer><a href={`mailto:${perfil.email}`}>{perfil.email}</a>{perfil.cv&&<> · <Enlace url={archivo(perfil.cv)}>CV</Enlace></>} · Actualizado: {perfil.actualizado}</footer>
 </div>;
}
