import { render, screen } from '@testing-library/react';
import PhotoList from './PhotoList';

const photosDataEmpty = [];

const photosData = [
  {
    id: '51918043535',
    owner: '51455438@N07',
    secret: '6ffef65667',
    server: '65535',
    farm: 66,
    title: 'EM-210704-POST-017',
    ispublic: 1,
    isfriend: 0,
    isfamily: 0
  },
  {
    id: '51917037191',
    owner: '195011677@N02',
    secret: 'd198f22e98',
    server: '65535',
    farm: 66,
    title: 'Friday reflection',
    ispublic: 1,
    isfriend: 0,
    isfamily: 0
  },
  {
    id: '51917033986',
    owner: '195011677@N02',
    secret: 'f434756397',
    server: '65535',
    farm: 66,
    title: 'Friday reflection',
    ispublic: 1,
    isfriend: 0,
    isfamily: 0
  },
  {
    id: '51917029531',
    owner: '195011677@N02',
    secret: 'c916d1b8c7',
    server: '65535',
    farm: 66,
    title: 'Things hidden under trees',
    ispublic: 1,
    isfriend: 0,
    isfamily: 0
  },
  {
    id: '51915595111',
    owner: '51455438@N07',
    secret: 'd998232b95',
    server: '65535',
    farm: 66,
    title: 'EM-220221-POST-001',
    ispublic: 1,
    isfriend: 0,
    isfamily: 0
  },
  {
    id: '51912646192',
    owner: '51455438@N07',
    secret: 'cd637ee307',
    server: '65535',
    farm: 66,
    title: 'EM-210523-POST-017',
    ispublic: 1,
    isfriend: 0,
    isfamily: 0
  },
  {
    id: '51910568062',
    owner: '51455438@N07',
    secret: 'c0731f4131',
    server: '65535',
    farm: 66,
    title: 'EM-210704-POST-018',
    ispublic: 1,
    isfriend: 0,
    isfamily: 0
  },
  {
    id: '51909930140',
    owner: '51455438@N07',
    secret: 'd2a38d41aa',
    server: '65535',
    farm: 66,
    title: 'EM-201228-POST-001',
    ispublic: 1,
    isfriend: 0,
    isfamily: 0
  },
  {
    id: '51909113059',
    owner: '195011677@N02',
    secret: '4501ac75c6',
    server: '65535',
    farm: 66,
    title: 'Spread love <3',
    ispublic: 1,
    isfriend: 0,
    isfamily: 0
  },
  {
    id: '51907384889',
    owner: '51455438@N07',
    secret: 'cedfb88257',
    server: '65535',
    farm: 66,
    title: 'EM-210523-POST-016',
    ispublic: 1,
    isfriend: 0,
    isfamily: 0
  },
  {
    id: '51905441878',
    owner: '28949071@N03',
    secret: '39f60428d2',
    server: '65535',
    farm: 66,
    title: 'Great Egret (Ardea Alba)',
    ispublic: 1,
    isfriend: 0,
    isfamily: 0
  },
  {
    id: '51905052716',
    owner: '51455438@N07',
    secret: 'c9b4001165',
    server: '65535',
    farm: 66,
    title: 'EM-220221-POST-002',
    ispublic: 1,
    isfriend: 0,
    isfamily: 0
  },
  {
    id: '51902628919',
    owner: '111712935@N07',
    secret: 'ae9bbacde3',
    server: '65535',
    farm: 66,
    title: 'Canada Goose.',
    ispublic: 1,
    isfriend: 0,
    isfamily: 0
  },
  {
    id: '51902557544',
    owner: '111712935@N07',
    secret: '3c28d7e57c',
    server: '65535',
    farm: 66,
    title: 'Bald Eagle with fish.',
    ispublic: 1,
    isfriend: 0,
    isfamily: 0
  },
  {
    id: '51893359537',
    owner: '25535117@N00',
    secret: 'c98da936c6',
    server: '65535',
    farm: 66,
    title: 'Volga-Dnepr Antonov AN-124 (RA-82078) GJ ©',
    ispublic: 1,
    isfriend: 0,
    isfamily: 0
  },
  {
    id: '51894972890',
    owner: '25535117@N00',
    secret: '09e951b572',
    server: '65535',
    farm: 66,
    title: 'Flight VI119 - Volga-Dnepr Antonov AN-124 (RA-82078) GJ ©',
    ispublic: 1,
    isfriend: 0,
    isfamily: 0
  },
  {
    id: '51894972780',
    owner: '25535117@N00',
    secret: '49046f50a4',
    server: '65535',
    farm: 66,
    title: 'Flight QY79 - DHL - European Air Transport - EAT Airbus A330-200F (D-ALMA) JCW ©',
    ispublic: 1,
    isfriend: 0,
    isfamily: 0
  },
  {
    id: '51890248418',
    owner: '25535117@N00',
    secret: '09277213f4',
    server: '65535',
    farm: 66,
    title: "Flight CV7619 - Cargolux Airlines International Boeing B747-400F (LX-NCL) 'Retro' livery GJ - being loaded ©",
    ispublic: 1,
    isfriend: 0,
    isfamily: 0
  },
  {
    id: '51889183367',
    owner: '152378314@N02',
    secret: '2cf188edc6',
    server: '65535',
    farm: 66,
    title: 'chouette lapone',
    ispublic: 1,
    isfriend: 0,
    isfamily: 0
  },
  {
    id: '51890146056',
    owner: '152378314@N02',
    secret: '6edfc6b6ee',
    server: '65535',
    farm: 66,
    title: 'listen to the great gray owl !',
    ispublic: 1,
    isfriend: 0,
    isfamily: 0
  },
  {
    id: '51889817391',
    owner: '25535117@N00',
    secret: '1fd47e734d',
    server: '65535',
    farm: 66,
    title: 'Flight TK1919 - Turkish Airlines Cargo Boeing B777-200LRF (TC-LJN) PH ©',
    ispublic: 1,
    isfriend: 0,
    isfamily: 0
  },
  {
    id: '51889817271',
    owner: '25535117@N00',
    secret: '9136ecfc70',
    server: '65535',
    farm: 66,
    title: 'Lufthansa Airbus A340-300 (D-AIGC) "Star Alliance" livery JCW ©',
    ispublic: 1,
    isfriend: 0,
    isfamily: 0
  },
  {
    id: '51889904403',
    owner: '25535117@N00',
    secret: '93b56fe7e2',
    server: '65535',
    farm: 66,
    title: 'Flight VI119 - Volga-Dnepr Antonov AN-124 (RA-82078) GJ taxiing ©',
    ispublic: 1,
    isfriend: 0,
    isfamily: 0
  },
  {
    id: '51890468325',
    owner: '25535117@N00',
    secret: 'd3fa90c699',
    server: '65535',
    farm: 66,
    title: 'Flight AA28 - American Airlines Boeing 777-223ER (N797AN) GJ taxiing next to Cautport engine test facilities ©',
    ispublic: 1,
    isfriend: 0,
    isfamily: 0
  }
];

describe('PhotoList', () => {
  it('should render <NoResults /> components if no photo data', () => {
    render(
      <PhotoList photosData={photosDataEmpty} />
    );
    const component = screen.getByText('No Results Found');
    expect(component).toBeInTheDocument();
  });

  it('should contain a list if photo data provided', () => {
    render(
      <PhotoList photosData={photosData} />
    );
    const list = screen.getByRole('list');
    expect(list).toBeInTheDocument();
  });

  it('should contain correct number of photos', () => {
    render(
      <PhotoList photosData={photosData} />
    );
    const list = screen.getByRole('list');
    const photosLength = photosData.length;
    const listLength = list.children.length;
    expect(listLength).toEqual(photosLength);
  });

  it('should have class .photo-list', () => {
    render(
      <PhotoList photosData={photosData} />
    );
    const list = screen.getByRole('list');
    const section = list.closest('section');
    expect(section.getAttribute('class')).toEqual('photo-list');
  });

  it.todo('should contain images with data mapped correctly');
});
