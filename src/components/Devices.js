import React from 'react';
import styled from 'styled-components';
import { ArcSlider, Box, Checkbox, Flex, Table, Txt } from 'rendition';
import { Triangle } from './Triangle';
import { Renamer } from './Renamer';

const url = 'http://localhost:3000/api/v1/device';
const BREAKPOINT = '700px';

const DevicesContainer = styled(Flex)`
  flex-direction: column;
  margin-top: 1px;

  @media (min-width: ${BREAKPOINT}) {
    flex-direction: row;
    margin-top: 38px;
  }
`;

const TableContainer = styled(Box)`
  flex-grow: 1;
  order: 2;

  @media (min-width: ${BREAKPOINT}) {
    flex-grow: 3;
    order: 1;
  }
`;

const ControlContainer = styled(Box)`
  flex-grow: 1;
  order: 1;
  margin-left: 0px;
  border-top-left-radius: 0;

  @media (min-width: ${BREAKPOINT}) {
    flex-grow: 2;
    order: 2;
    margin-left: 16px;
    border-top-left-radius: 10px;
  }
`;

const BrightnessController = styled(ArcSlider)`
  width: 150px;

  @media (min-width: ${BREAKPOINT}) {
    width: 400px;
  }
`;

const columns = [
  {
    field: 'name',
    label: 'Name',
    sortable: true,
  },
  {
    field: 'active',
    label: 'State',
    sortable: true,
    render(value) {
      return (
        <Flex>
          <Checkbox toggle checked={value} mr={2} />
          <Txt ml={2}>{value ? 'On' : 'Off'}</Txt>
        </Flex>
      );
    },
  },
  {
    field: 'brightness',
    label: 'Brightness',
    sortable: true,
    render(value) {
      return `${value}%`;
    },
  },
];

const setDisplayBrightness = bulbsData => {
  const bulbs = bulbsData.data;

  for (let i = 0; i < bulbs.length; i++) {
    Object.assign(bulbs[i], {
      brightness: bulbs[i].active ? bulbs[i].brightness : 0,
      storedBrightness: bulbs[i].brightness,
    });
  }
  return bulbs;
};

export class Devices extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedBulb: 0,
      bulbs: [],
      inputFieldHidden: true,
    };

    this.onRowClick = this.onRowClick.bind(this);
    this.onToggleSwitch = this.onToggleSwitch.bind(this);
    this.onBrightnessChange = this.onBrightnessChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onRename = this.onRename.bind(this);
  }

  onRowClick(row) {
    const newState = this.state;
    newState.selectedBulb = row.id - 1;
    this.setState(newState);
  }

  onToggleSwitch() {
    const bulb = this.state.bulbs[this.state.selectedBulb];
    const backupBulbs = this.state.bulbs;
    const newBulbs = this.state.bulbs;
    const bulbSetting = bulb.active
      ? {
          brightness: 0,
          active: false,
        }
      : {
          brightness: bulb.storedBrightness,
          active: true,
        };
    newBulbs[this.state.selectedBulb] = Object.assign({}, bulb, bulbSetting);
    this.setState({ bulbs: newBulbs });

    fetch(`${url}/${bulb.id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        data: {
          active: bulbSetting.active,
        },
      }),
    }).catch(err => {
      console.log(err);
      this.setState({ bulbs: backupBulbs });
    });
  }

  onBrightnessChange(value) {
    const brightness = (value * 100).toFixed(0);
    const bulb = this.state.bulbs[this.state.selectedBulb];
    const backupBulbs = this.state.bulbs;
    const newBulbs = this.state.bulbs;
    const bulbSetting = {
      brightness: brightness,
      storedBrightness: brightness,
      active: brightness < 1 ? false : true,
    };
    newBulbs[this.state.selectedBulb] = Object.assign({}, bulb, bulbSetting);
    this.setState({ bulbs: newBulbs });

    fetch(`${url}/${bulb.id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        data: {
          brightness,
        },
      }),
    }).catch(err => {
      console.log(err);
      this.setState({ bulbs: backupBulbs });
    });
  }

  onRename(e) {
    if (!this.state.inputFieldHidden) {
      const bulb = this.state.bulbs[this.state.selectedBulb];
      const backupBulbs = this.state.bulbs;
      const newBulbs = this.state.bulbs;

      newBulbs[this.state.selectedBulb] = Object.assign({}, bulb, {
        name: bulb.name,
      });
      this.setState({ bulbs: newBulbs });

      fetch(`${url}/${bulb.id}`, {
        method: 'PATCH',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          data: {
            name: bulb.name,
          },
        }),
      }).catch(err => {
        console.log(err);
        this.setState({ bulbs: backupBulbs });
      });
    }

    this.setState(prevState => ({
      inputFieldHidden: !prevState.inputFieldHidden,
    }));
  }

  onChange(e) {
    const newBulbs = this.state.bulbs;
    const bulb = this.state.bulbs[this.state.selectedBulb];
    const name = { name: e.target.value };
    newBulbs[this.state.selectedBulb] = Object.assign({}, bulb, name);
    this.setState({ bulbs: newBulbs });
  }

  componentDidMount() {
    fetch('http://localhost:3000/api/v1/device')
      .then(response => response.json())
      .then(bulbs => setDisplayBrightness(bulbs))
      .then(bulbs => {
        this.setState({
          bulbs: bulbs,
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    const brightness =
      this.state.bulbs.length > 0
        ? this.state.bulbs[this.state.selectedBulb].brightness
        : 0;
    const placeholder =
      this.state.bulbs.length > 0
        ? this.state.bulbs[this.state.selectedBulb].name
        : '';

    return (
      <DevicesContainer flex='1'>
        <TableContainer pl={3}>
          <Table
            flex='1'
            columns={columns}
            data={this.state.bulbs}
            rowKey='id'
            onChange={this.onToggleSwitch}
            onRowClick={this.onRowClick}
          />
          <Renamer
            onRename={this.onRename}
            onChange={this.onChange}
            placeholder={placeholder}
            inputFieldHidden={this.state.inputFieldHidden}
          />
        </TableContainer>

        <ControlContainer bg='secondary.main'>
          <Triangle position={this.state.selectedBulb} />
          <BrightnessController
            mx='auto'
            value={brightness / 100}
            onValueChange={this.onBrightnessChange}
          >
            <Txt color='white' fontSize={4}>
              {brightness}%
            </Txt>
            <Txt color='white' fontSize={0}>
              Brightness
            </Txt>
          </BrightnessController>
        </ControlContainer>
      </DevicesContainer>
    );
  }
}
