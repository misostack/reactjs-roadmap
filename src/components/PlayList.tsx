import React from 'react';

const SONGS = [
  {
    id: 1,
    name: 'Lạc Trôi',
    singer: 'Sơn Tùng',
    pubDate: '2018-05-20',
    views: 10000,
    downloads: 9999
  },
  {
    id: 2,
    name: 'Thu Cuối',
    singer: 'Yanbi',
    pubDate: '2018-05-01',
    views: 10001,
    downloads: 10000
  },
  {
    id: 3,
    name: 'Ngắm hoa lệ rơi',
    singer: 'Đỗ Khải Phong',
    pubDate: '2019-04-20',
    views: 9999,
    downloads: 10001
  }
];

// Write A List Song Application, that allow user to:

// 1. Find the singer by name
// 2. Build Album by month and year. Eg: Album 05/2018
// 3. Calculate the rank for each song in the list by views or downloads

export class PlayList extends React.Component {
  constructor(props: any) {
    // this is where the component's state is initiated
    super(props);
    this.state = {};
  }
}
