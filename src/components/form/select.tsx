import classNames from 'classnames';
import React from 'react';
import { arrayEquals } from '../../utils/array-equals';
import { isDefined } from '../../utils/functions';
import { replaceSpecialCharacters } from '../../utils/replace-special-characters';
import Button from './button';
import { SelectOption } from './option';

export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  marker?: boolean;
  actions?: boolean;
  search?: boolean;
  options: SelectOption[];
  onChange?: (value: SelectOption | SelectOption[]) => unknown;
};

type SelectState = {
  selectedOptions: SelectOption[];
  open: boolean;
  filter: string;
};

type ValuesArray = readonly (string | number)[];

export default class Select extends React.Component<SelectProps, SelectState> {
  // const [display, setDisplay] = useState('');

  value: string | number | ValuesArray | null;
  display: string;
  selectedOptionsHash: {
    [key: string | number]: boolean;
  };
  ref: React.RefObject<HTMLDivElement>;

  constructor(props: SelectProps) {
    super(props);
    this.state = {
      selectedOptions: [],
      open: false,
      filter: ''
    };
    this.selectedOptionsHash = {};
    this.value = this.props.value || null;
    this.display = '';
    this.ref = React.createRef();

    if (isDefined(this.value) && this.value !== '') {
      let selectedOptions: SelectOption[] = [];
      this.props.options.forEach((option) => {
        if (
          (this.props.multiple &&
            (this.value as ValuesArray).includes(option.value)) ||
          (!this.props.multiple && this.value === option.value)
        ) {
          selectedOptions = [...selectedOptions, option];
          this.selectedOptionsHash[option.value] = true;
        }
      });
      if (selectedOptions.length === 0) {
        if (!this.props.placeholder) {
          this.setState({ selectedOptions: [this.props.options[0]] });
          this.apply();
        } else {
          this.display = this.props.placeholder;
        }
      }
    }
  }

  onClickOutside = (event: MouseEvent) => {
    if (this.state.open && !this.ref.current?.contains(event.target as Node)) {
      this.cancel();
    }
  };

  componentDidMount(): void {
    document.addEventListener('click', this.onClickOutside);
  }

  componentWillUnmount(): void {
    document.removeEventListener('click', this.onClickOutside);
  }

  closeOptions = () => {
    this.setState({ open: false });
  };

  cancel = () => {
    if (
      (!this.props.multiple &&
        this.value !== this.state.selectedOptions[0]?.value) ||
      (this.props.multiple &&
        !arrayEquals(
          this.value as (string | number)[],
          this.state.selectedOptions.map(({ value }) => value)
        ))
    ) {
      // this.handleOptionsOrValueChanges();
      console.log('houve alteração');
      // this.apply();
    }
    // else {
    this.closeOptions();
    // }
  };

  apply = () => {
    const { selectedOptions } = this.state;
    const { options } = this.props;
    if (this.props.multiple) {
      const orderedSelectedOptions = options.filter((option) =>
        selectedOptions.some(({ value }) => option.value === value)
      );
      this.props.onChange?.(orderedSelectedOptions);
      this.value = orderedSelectedOptions.map(({ value }) => value);
      this.display = orderedSelectedOptions
        .map(({ label }) => label)
        .join(', ');
    } else {
      this.props.onChange?.(selectedOptions[0]);
      this.value = selectedOptions[0].value;
      this.display = selectedOptions[0].label;
    }
    this.closeOptions();
  };

  toggleOptions = () => this.setState((state) => ({ open: !state.open }));

  isSelected = (value: string | number) => {
    return this.selectedOptionsHash[value];
  };

  unselect = (value: string | number) => {
    this.setState(
      (state) => ({
        selectedOptions: state.selectedOptions.filter((v) => v.value !== value)
      }),
      () => !this.props.actions && this.apply()
    );
  };

  select = (option: SelectOption) => {
    this.selectedOptionsHash = this.props.multiple
      ? { ...this.selectedOptionsHash, [option.value]: true }
      : { [option.value]: true };
    this.setState(
      (state) => {
        return {
          selectedOptions: this.props.multiple
            ? [...state.selectedOptions, option]
            : [option]
        };
      },
      () => {
        if (!this.props.multiple && !this.props.actions) {
          this.apply();
        }
      }
    );
  };

  handleClickOption = (option: SelectOption) => {
    if (this.isSelected(option.value)) {
      if (this.props.multiple) {
        this.unselect(option.value);
      }
    } else {
      this.select(option);
    }
  };

  render() {
    const { actions, search, options } = this.props;
    const { selectedOptions, open, filter } = this.state;
    const { display } = this;

    return (
      <div
        ref={this.ref}
        className={classNames('select')}
        // [ngClass]="getSelectClasses()"
        role='combobox'
      >
        <div className='container relative'>
          <select
            className='w-0 h-0 opacity-0 absolute top-0 left-0'
            id={this.props.id}
            name={this.props.name}
            // (focus)="button.focus()"
            {...this.props}
            value={
              selectedOptions.length > 1
                ? selectedOptions.map(({ value }) => String(value))
                : selectedOptions[0]?.value
            }
          ></select>
          {/* {label &
        (<label
          // [for]="id"
          className="label-text"
        >
          { label }
        </label>)
  } */}
          <button
            className={classNames('input display text-left', { focus: open })}
            onClick={this.toggleOptions}
            // #button
            type='button'
          >
            <p
            // [ngClass]="{ placeholder: [null, undefined].includes(this.value) || this.value.length === 0 }"
            >
              {display}
            </p>
            {/* <app-icon
          [size]="18"
          className="chevron-icon"
          name="chevron-down"
        ></app-icon> */}
          </button>
          <div
            className={classNames(
              'select-content bg-dark z-[1] absolute left-0 top-[calc(100%+2px)] w-full opacity-100 block border border-neutral-2 rounded',
              {
                'opacity-0 hidden': !open
              }
            )}
            // [ngClass]="{ 'with-actions': actions }"
          >
            {search && (
              <div className='search flex overflow-hidden py-3 px-5'>
                {/* <app-icon name="search-custom"></app-icon> */}
                <input
                  className='flex-1 py-0 px-5 border-none outline-none'
                  // search
                  type='search'
                  // [(ngModel)]="filterDisplay"
                  placeholder='Pesquisar'
                />
              </div>
            )}
            <ul
              className={classNames(
                'options bg-neutral-1 cursor-pointer w-full h-fit max-h-36 flex flex-col gap-1 overflow-y-auto p-3 rounded',
                { 'pb-1': actions }
              )}
              // [ngClass]="{ search: search }"
            >
              {options
                .filter((option) =>
                  replaceSpecialCharacters(option.label.toLowerCase()).includes(
                    replaceSpecialCharacters(filter.toLowerCase())
                  )
                )
                .map((option) => {
                  const { value, label } = option;
                  const key = `Option-${value}`;
                  return (
                    <li
                      key={key}
                      className={classNames(
                        'option flex items-center justify-left text-sm py-1 px-2 rounded relative transition-all hover:bg-accent-1',
                        { 'bg-primary-1': this.isSelected(option.value) }
                      )}
                      onClick={() => this.handleClickOption(option)}
                      role='option'
                    >
                      <span>{label}</span>
                    </li>
                  );
                })}
            </ul>
            {actions && (
              <div className='actions bg-neutral-1 border-t border-neutral-2 py-0 px-5 h-10 flex justify-end items-center gap-4'>
                <Button onClick={this.cancel} clear sm className='text-md'>
                  Cancelar
                </Button>
                <Button onClick={this.apply} primary sm className='text-md'>
                  Salvar
                </Button>
              </div>
            )}
          </div>
          {/* select-content end  */}
        </div>
      </div>
    );
  }
}

export function ulOptions() {
  return (
    <ul
      className='options'
      // [ngClass]="{ search: search }"
    >
      {/* <ng-container *ngFor="let option of getFilteredOptions()"> */}

      <li
        // [ngClass]="{ selected: isSelected(option) }"
        className='option'
        // (click)="handleClickOption(option)"
        role='none'
      >
        <span>{/* { option.display } */}</span>
        {/* <ng-container *ngIf="marker === 'radio'">
          <app-radio
            withControl="false"
            [id]="option.value"
            [name]="option.value"
            [checked]="isSelected(option)"
          />
        </ng-container>
        <ng-container *ngIf="marker === 'checkbox'">
          <app-checkbox
            withControl="false"
            [checked]="isSelected(option)"
          />
        </ng-container> */}
      </li>
      {/* </ng-container> */}
    </ul>
  );
}
