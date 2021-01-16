import React from "react";
import {
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  FormInput,
  Collapse
} from "shards-react";
import "../styling/Header.css";


export default class Header extends React.Component {
  constructor(props) {
    super(props);

    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.toggleNavbar = this.toggleNavbar.bind(this);

    this.state = {
      dropdownOpen: false,
      collapseOpen: false
    };
  }

  

  toggleNavbar() {
    this.setState({
      ...this.state,
      ...{
        collapseOpen: !this.state.collapseOpen
      }
    });
  }

  render() {
    return (
      <Navbar type="dark" theme="primary" expand="md">
        <div className= "right-comp">
          
        <NavbarBrand href="#">Shoppies</NavbarBrand>
        <NavbarToggler onClick={this.toggleNavbar} />
        </div>

        <Collapse open={this.state.collapseOpen} navbar>
          
          <Nav navbar>
            <NavItem>
            <NavLink active href="#">
            Movie Awards For Entrepreneurs
              </NavLink>
              
            </NavItem>
           
          </Nav>
          
          
        </Collapse>
        <Nav navbar className="ml-auto">
            <InputGroup size="sm" seamless>
              <InputGroupAddon type="prepend">
                <InputGroupText>
                  
                </InputGroupText>
              </InputGroupAddon>
              <FormInput className="border-0" placeholder="Search..." />
            </InputGroup>
          </Nav>
      </Navbar>
    );
  }
}
