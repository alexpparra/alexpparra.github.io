import { useEffect, useState } from 'react';
import { contenido } from './idiomas';

const secciones = [
  { id: 'news', funcion: 'latest_news' },
  { id: 'research', funcion: 'research' },
  { id: 'teaching', funcion: 'teaching' },
  { id: 'awards', funcion: 'awards' },
];

const archivo = nombre => `${import.meta.env.BASE_URL}${nombre}`;

function Enlace({ url, children, className }) {
  return url ? (
    <a
      className={className}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  ) : (
    <span className={className}>{children}</span>
  );
}

function Celda({ seccion, numero, identificador, children }) {
  const [abierta, setAbierta] = useState(true);

  return (
    <section
      id={seccion.id}
      className="cell"
      aria-labelledby={`titulo-${seccion.id}`}
    >
      <div className="input-row">
        <span className="prompt" aria-hidden="true">
          In [{numero}]:
        </span>

        <h2 id={`titulo-${seccion.id}`}>
          <button
            type="button"
            aria-expanded={abierta}
            aria-controls={`salida-${seccion.id}`}
            onClick={() => setAbierta(actual => !actual)}
          >
            <code>
              {identificador}.{seccion.funcion}()
            </code>

            <span
              className={`chevron ${abierta ? '' : 'closed'}`}
              aria-hidden="true"
            >
              ⌄
            </span>
          </button>
        </h2>
      </div>

      <div
        className="output-row"
        id={`salida-${seccion.id}`}
        hidden={!abierta}
      >
        <span className="prompt" aria-hidden="true">
          Out[{numero}]:
        </span>

        <div className="output">{children}</div>
      </div>
    </section>
  );
}

export default function App() {
  const [activa, setActiva] = useState('news');
  const [fotoError, setFotoError] = useState(false);

  const [idioma, setIdioma] = useState(() => {
    try {
      const guardado = localStorage.getItem('idioma-pagina');
      if (guardado === 'en' || guardado === 'es') return guardado;
    } catch {
      // El selector funciona aunque no se pueda guardar la preferencia.
    }

    return 'es';
  });

  const [temaOscuro, setTemaOscuro] = useState(() => {
    try {
      const guardado = localStorage.getItem('tema-pagina');
      if (guardado === 'oscuro') return true;
      if (guardado === 'claro') return false;
    } catch {
      // Se utilizará la preferencia del dispositivo.
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const {
    perfil,
    novedades,
    investigaciones,
    cursos,
    premios,
    textos: t,
  } = contenido[idioma];

  useEffect(() => {
    const tema = temaOscuro ? 'oscuro' : 'claro';
    document.documentElement.dataset.tema = tema;

    try {
      localStorage.setItem('tema-pagina', tema);
    } catch {
      // El cambio de tema sigue funcionando.
    }
  }, [temaOscuro]);

  useEffect(() => {
    document.documentElement.lang = idioma;
    document.title = perfil.nombre;

    const descripcion = document.querySelector(
      'meta[name="description"]'
    );

    if (descripcion) descripcion.content = t.descripcion;

    try {
      localStorage.setItem('idioma-pagina', idioma);
    } catch {
      // El cambio de idioma sigue funcionando.
    }
  }, [idioma, perfil.nombre, t.descripcion]);

  useEffect(() => {
    let pendiente = 0;

    const actualizar = () => {
      pendiente = 0;
      let actual = secciones[0].id;

      for (const seccion of secciones) {
        const elemento = document.getElementById(seccion.id);

        if (
          elemento &&
          elemento.getBoundingClientRect().top <=
            window.innerHeight * 0.35
        ) {
          actual = seccion.id;
        }
      }

      if (
        window.scrollY > 0 &&
        window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - 8
      ) {
        actual = 'awards';
      }

      setActiva(actual);
    };

    const programar = () => {
      if (!pendiente) {
        pendiente = requestAnimationFrame(actualizar);
      }
    };

    actualizar();

    window.addEventListener('scroll', programar, { passive: true });
    window.addEventListener('resize', programar);

    const observer = new ResizeObserver(programar);
    observer.observe(document.querySelector('main'));

    return () => {
      window.removeEventListener('scroll', programar);
      window.removeEventListener('resize', programar);
      observer.disconnect();
      cancelAnimationFrame(pendiente);
    };
  }, []);

  return (
    <div className="page">
      <div className="page-controls">
        <button
          type="button"
          className="language-toggle"
          onClick={() =>
            setIdioma(actual => actual === 'es' ? 'en' : 'es')
          }
          lang={idioma === 'es' ? 'en' : 'es'}
          aria-label={t.cambiarIdioma}
          title={t.cambiarIdioma}
        >
          {idioma === 'es' ? 'EN' : 'ES'}
        </button>

        <button
          type="button"
          className="theme-toggle"
          onClick={() => setTemaOscuro(actual => !actual)}
          aria-label={temaOscuro ? t.modoClaro : t.modoOscuro}
          title={temaOscuro ? t.modoClaro : t.modoOscuro}
        >
          <span aria-hidden="true">
            {temaOscuro ? '☀' : '☾'}
          </span>
        </button>
      </div>

      <a className="skip" href="#contenido">
        {t.saltar}
      </a>

      <header className="hero">
        <div className="portrait">
          {perfil.foto && !fotoError ? (
            <img
              src={archivo(perfil.foto)}
              alt={`${t.retrato} ${perfil.nombre}`}
              onError={() => setFotoError(true)}
              width="180"
              height="180"
            />
          ) : (
            <span aria-label={t.fotoPendiente}>
              {perfil.iniciales}
            </span>
          )}
        </div>

        <div className="bio">
          <h1>{perfil.nombre}</h1>

          <p className="affiliation">
            {perfil.cargo}, {perfil.institucion}
          </p>

          <div className="primary-links">
            {perfil.cv && (
              <Enlace url={archivo(perfil.cv)}>CV</Enlace>
            )}

            {perfil.scholar && (
              <Enlace url={perfil.scholar}>Google Scholar</Enlace>
            )}

            <a className="email" href={`mailto:${perfil.email}`}>
              {perfil.email}
            </a>
          </div>

          <div className="socials">
            {[
              ['GitHub', perfil.github],
              ['X', perfil.x],
              ['LinkedIn', perfil.linkedin],
            ]
              .filter(([, url]) => url)
              .map(([nombre, url]) => (
                <Enlace key={nombre} url={url}>
                  {nombre}
                </Enlace>
              ))}
          </div>

          <div className="biography">
            {perfil.biografia.map((parrafo, indice) => (
              <p key={indice}>{parrafo}</p>
            ))}
          </div>
        </div>
      </header>

      <nav className="toc" aria-label={t.navegacion}>
        {secciones.map(seccion => (
          <a
            key={seccion.id}
            href={`#${seccion.id}`}
            aria-current={activa === seccion.id ? 'location' : undefined}
          >
            {t.secciones[seccion.id]}
          </a>
        ))}
      </nav>

      <main id="contenido">
        <Celda
          seccion={secciones[0]}
          numero={1}
          identificador={perfil.identificador}
        >
          <ul className="news">
            {novedades.map((noticia, indice) => (
              <li key={indice}>
                <span className="date">{noticia.fecha}</span>

                <span>
                  {noticia.antes}
                  <Enlace url={noticia.url} className="accent">
                    {noticia.destacado}
                  </Enlace>
                  {noticia.despues}
                </span>
              </li>
            ))}
          </ul>
        </Celda>

        <Celda
          seccion={secciones[1]}
          numero={2}
          identificador={perfil.identificador}
        >
          {investigaciones.map((trabajo, indice) => (
            <article className="paper" key={indice}>
              <h3>
                <Enlace url={trabajo.url}>{trabajo.titulo}</Enlace>
              </h3>
              <p>{trabajo.descripcion}</p>
              <p className="metadata">
                {trabajo.autores}. {trabajo.medio}
              </p>
            </article>
          ))}

          {perfil.scholar && (
            <Enlace className="more" url={perfil.scholar}>
              {t.masScholar}
            </Enlace>
          )}
        </Celda>

        <Celda
          seccion={secciones[2]}
          numero={3}
          identificador={perfil.identificador}
        >
          <div className="courses">
            {cursos.map((curso, indice) => (
              <article className="course" key={indice}>
                <p className="date">{curso.fecha}</p>

                <h3>
                  <Enlace url={curso.url}>{curso.titulo}</Enlace>
                </h3>

                <p>{curso.institucion}</p>
                <p>{curso.descripcion}</p>
              </article>
            ))}
          </div>
        </Celda>

        <Celda
          seccion={secciones[3]}
          numero={4}
          identificador={perfil.identificador}
        >
          <ul className="awards">
            {premios.map((premio, indice) => (
              <li key={indice}>
                <Enlace url={premio.url}>{premio.nombre}</Enlace>
                <span className="date"> {premio.fecha}</span>
              </li>
            ))}
          </ul>
        </Celda>
      </main>

      <footer>
        <a href={`mailto:${perfil.email}`}>{perfil.email}</a>

        {perfil.cv && (
          <>
            {' · '}
            <Enlace url={archivo(perfil.cv)}>CV</Enlace>
          </>
        )}

        {' · '}
        {t.actualizado}: {perfil.actualizado}
      </footer>
    </div>
  );
}
