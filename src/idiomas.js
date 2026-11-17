import * as espanol from './datos';

export const contenido = {
  es: {
    ...espanol,

    textos: {
      cambiarIdioma: 'Switch to English',
      modoClaro: 'Activar modo claro',
      modoOscuro: 'Activar modo oscuro',
      saltar: 'Saltar al contenido',
      navegacion: 'Secciones de la página',
      retrato: 'Retrato de',
      fotoPendiente: 'Espacio para tu fotografía',
      masScholar: '... más en Google Scholar',
      actualizado: 'Actualizado',
      descripcion: 'Página personal: investigación, docencia y proyectos.',

      secciones: {
        news: 'novedades',
        research: 'investigación',
        teaching: 'docencia',
        awards: 'reconocimientos',
      },
    },
  },

  en: {
    // Comparte nombre, fotografía, correo y enlaces con la versión española.
    perfil: {
      ...espanol.perfil,

      cargo: 'Environmental Engineer',
      institucion: 'Universidad del Azuay',
      actualizado: 'November 2026',

      biografia: [
        'Write your personal introduction here: what you study or do, the topics you research, and the goals of your work.',
        'In this second paragraph, you can explain your interests, experience, and the kinds of collaborations you are looking for.',
      ],
    },

    novedades: [
      {
        fecha: 'Nov. 2026',
        antes: 'Introducing ',
        destacado: 'my new project',
        despues: ', an initiative focused on technology and education.',
        url: espanol.novedades[0]?.url ?? '',
      },
      {
        fecha: '2026',
        antes: '',
        destacado: 'My first publication',
        despues: ' was presented at a conference.',
        url: espanol.novedades[1]?.url ?? '',
      },
      {
        fecha: '2026',
        antes: 'Participation in ',
        destacado: 'a course or workshop',
        despues: ' in my field of expertise.',
        url: espanol.novedades[2]?.url ?? '',
      },
    ],

    investigaciones: [
      {
        titulo: 'Title of your first research project',
        descripcion:
          'Briefly explain the problem you are studying and the main contribution of your work.',
        autores: 'Your Name, Coauthor Name',
        medio: 'Journal or conference · Year',
        url: espanol.investigaciones[0]?.url ?? '',
      },
      {
        titulo: 'Another project or publication',
        descripcion:
          'Describe the methodology and the most relevant results of this project.',
        autores: 'Your Name, Coauthor Name',
        medio: 'Under review',
        url: espanol.investigaciones[1]?.url ?? '',
      },
      {
        titulo: 'A new research direction',
        descripcion:
          'Share the topics you are exploring and the questions guiding your research.',
        autores: 'Your Name',
        medio: 'Work in progress',
        url: espanol.investigaciones[2]?.url ?? '',
      },
    ],

    cursos: [
      {
        fecha: 'Term · Lecturer',
        titulo: 'First course title',
        institucion: 'Your university',
        descripcion:
          'A brief description of the course and your involvement.',
        url: espanol.cursos[0]?.url ?? '',
      },
      {
        fecha: 'Term · Instructor',
        titulo: 'Second course title',
        institucion: 'Your university',
        descripcion:
          'The main topics covered and the intended audience.',
        url: espanol.cursos[1]?.url ?? '',
      },
      {
        fecha: 'Term · Contributor',
        titulo: 'Workshop or activity',
        institucion: 'Your institution',
        descripcion:
          'Describe another teaching experience here.',
        url: espanol.cursos[2]?.url ?? '',
      },
      {
        fecha: 'Term · Mentor',
        titulo: 'Mentoring or collaboration',
        institucion: 'Your organization',
        descripcion:
          'Explain the guidance you provided and whom you supported.',
        url: espanol.cursos[3]?.url ?? '',
      },
    ],

    premios: [
      {
        nombre: 'Name of a scholarship or award',
        fecha: 'Year',
        url: espanol.premios[0]?.url ?? '',
      },
      {
        nombre: 'Name of another award',
        fecha: 'Year',
        url: espanol.premios[1]?.url ?? '',
      },
    ],

    textos: {
      cambiarIdioma: 'Cambiar a español',
      modoClaro: 'Switch to light mode',
      modoOscuro: 'Switch to dark mode',
      saltar: 'Skip to content',
      navegacion: 'Page sections',
      retrato: 'Portrait of',
      fotoPendiente: 'Space for your photograph',
      masScholar: '... more on Google Scholar',
      actualizado: 'Last updated',
      descripcion: 'Personal website: research, teaching, and projects.',

      secciones: {
        news: 'news',
        research: 'research',
        teaching: 'teaching',
        awards: 'awards',
      },
    },
  },
};
