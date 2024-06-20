import { Component, Prop, State, h } from '@stencil/core/internal';

interface RadioOption {
  id: string;
  name: string;
  value: string;
  checked: boolean;
}

@Component({
  tag: 'ip-radio-btn',
  styleUrl: 'ip-radio-btn.scss',
  shadow: true,
})
export class IpRadioBtn {
  @Prop() radioOptions: string;
  @State() radioOptionsList: RadioOption[] = [];

  parsedRadioOptions: RadioOption[] = [];

  componentWillLoad() {
    this.parsedRadioOptions = JSON.parse(this.radioOptions);
    this.radioOptionsList = this.parsedRadioOptions;
  }

  keyDownHandler(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      const radioOption = this.radioOptionsList.find(option => option.checked);
      if (radioOption) {
        this.handleRadioChange(radioOption.id);
      }
    }
  }

  handleRadioChange(id: string) {
    this.radioOptionsList = this.radioOptionsList.map((radioOption: RadioOption) => {
      if (radioOption.id === id) {
        return {
          ...radioOption,
          checked: true,
        };
      } else {
        return {
          ...radioOption,
          checked: false,
        };
      }
    });
  }

  render() {
    return (
      <div>
        {this.radioOptionsList.map((radioOption: RadioOption) => (
          <div class="radio-option" key={radioOption.id}>
            <input
              role="radio"
              type="radio"
              id={radioOption.id}
              name={radioOption.name}
              value={radioOption.value}
              checked={radioOption.checked}
              onChange={() => this.handleRadioChange(radioOption.id)}
              onKeyDown={this.keyDownHandler.bind(this)}
              aria-checked={radioOption.checked.toString()}
              aria-labelledby={radioOption.id}
            />
            <label id={radioOption.id} htmlFor={radioOption.id}>
              {radioOption.value}
            </label>
          </div>
        ))}
      </div>
    );
  }
}
