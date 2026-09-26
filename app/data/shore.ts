export interface ShoreFrame {
  image: string;
  place: string;
  country: string;
  flag: string;
  credit: string;
  creditHref: string;
  focus: string;
}

export function shore(lang: 'en' | 'pt'): ShoreFrame[] {
  const country = (en: string, pt: string) => (lang === 'pt' ? pt : en);
  return [
    {
      image: '/places/rio.jpg',
      place: 'Rio de Janeiro',
      country: country('Brazil', 'Brasil'),
      flag: 'br',
      credit: 'Márcia Regina Machado, CC BY-SA 4.0',
      creditHref: 'https://commons.wikimedia.org/wiki/File:P%C3%A3o_de_A%C3%A7%C3%BAcar_visto_da_praia_de_Botafogo_-_M%C3%A1rcia_Regina_Machado_-_(11).jpg',
      focus: 'center 42%',
    },
    {
      image: '/places/cartagena.jpg',
      place: 'Cartagena',
      country: country('Colombia', 'Colômbia'),
      flag: 'co',
      credit: 'Bernard Gagnon, CC BY-SA 4.0',
      creditHref: 'https://commons.wikimedia.org/wiki/File:City_walls_of_Cartagena_01.jpg',
      focus: 'center 35%',
    },
    {
      image: '/places/bellas-artes-fachada.jpg',
      place: 'Palacio de Bellas Artes',
      country: country('Mexico', 'México'),
      flag: 'mx',
      credit: 'Diego Delso, CC BY-SA 4.0',
      creditHref: 'https://commons.wikimedia.org/wiki/File:Palacio_de_Bellas_Artes,_Ciudad_de_M%C3%A9xico,_M%C3%A9xico,_2015-07-18,_DD_10.JPG',
      focus: 'center 55%',
    },
    {
      image: '/places/valparaiso.jpg',
      place: 'Valparaíso',
      country: 'Chile',
      flag: 'cl',
      credit: 'Alex Proimos, CC BY 2.0',
      creditHref: 'https://commons.wikimedia.org/wiki/File:On_the_Hill,_Valpara%C3%ADso_(Valparaiso),_Chile_(3927311373).jpg',
      focus: 'center 40%',
    },
    {
      image: '/places/puerto-madero.jpg',
      place: 'Puerto Madero',
      country: 'Argentina',
      flag: 'ar',
      credit: 'Andrzej Otrębski, CC BY-SA 4.0',
      creditHref: 'https://commons.wikimedia.org/wiki/File:Buenos_Aires_Puerto_Madero_24.jpg',
      focus: 'center 45%',
    },
  ];
}
