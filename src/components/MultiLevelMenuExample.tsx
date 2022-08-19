import React from 'react';

const MENUS = [
  {
    title: 'Home',
    link: '/'
  },
  {
    title: 'About us',
    link: '/about-us',
    childrens: [
      { title: 'Our Vision', link: '/our-vision' },
      { title: 'The difference', link: '/the-difference' },
      { title: 'Our Top Assets', link: '/our-top-assets' },
      { title: 'Our Offices', link: '/our-offices' }
    ]
  },
  { title: 'Contact', link: '/contact' },
  { title: 'Case Studies', link: '/case-studies' },
  { title: 'Studio', link: '/studio' },
  { title: 'Posts & News', link: '/posts-and-news' },
  { title: 'Careers', link: '/careers' }
];

interface MenuItemProps {
  title: string;
  link: string;
  childrens?: Array<MenuItemProps>;
}

class MenuItem extends React.Component<{ item: MenuItemProps }> {
  render(): React.ReactNode {
    const { title, link, childrens } = this.props.item;
    // eslint-disable-next-line multiline-ternary
    const subMenu = childrens ? (
      <ul style={{ paddingLeft: '20px' }}>
        {childrens.map(item => (
          <MenuItem key={item.title} item={item} />
        ))}
      </ul>
    ) : (
      ''
    );
    return (
      <>
        <li>
          <a href={link}>{title}</a>
          {subMenu}
        </li>
      </>
    );
  }
}

export class MultiLevelMenuExample extends React.Component<
  any,
  { menu: Array<MenuItemProps> }
> {
  constructor(props: any) {
    super(props);
    this.state = {
      menu: MENUS
    };
  }

  render(): React.ReactNode {
    console.log(this.state.menu);
    const { menu } = this.state;
    return (
      <ul>
        {menu.map(item => (
          <MenuItem key={item.title} item={item} />
        ))}
      </ul>
    );
  }
}
