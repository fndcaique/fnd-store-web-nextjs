import classNames from 'classnames';
import React from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { twMerge } from 'tailwind-merge';
import { arrayEquals } from '../../utils/array-equals';
import { isDefined } from '../../utils/functions';
import { replaceSpecialCharacters } from '../../utils/replace-special-characters';
import Button from './button';
import Checkbox from './checkbox';
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

type SelectValue = string | number;

type SelectValueArray = readonly SelectValue[];

type SelectHash = {
  [key: SelectValue]: boolean;
};

export default class Select extends React.Component<SelectProps, SelectState> {
  // const [display, setDisplay] = useState('');

  value: SelectValue | SelectValueArray | null;
  display: string;
  selectedOptionsHash: SelectHash;
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
            (this.value as SelectValueArray).includes(option.value)) ||
          (!this.props.multiple && this.value === option.value)
        ) {
          selectedOptions = [...selectedOptions, option];
          this.selectedOptionsHash[option.value] = true;
        }
      });
      if (selectedOptions.length === 0) {
        if (!this.props.placeholder) {
          this.setState({ selectedOptions: [this.props.options[0]] });
          this.applySelectedOptions();
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
      this.resetSelectedOptionsToValue();
    }
    this.closeOptions();
  };

  resetSelectedOptionsToValue = () => {
    this.selectedOptionsHash = {};

    const selectedOptions: SelectOption[] = this.props.options.filter(
      (option) =>
        this.props.multiple
          ? (this.value as SelectValueArray)?.includes(option.value)
          : option.value === this.value
    );

    if (this.props.multiple) {
      const value = this.value as SelectValueArray;
      if (value && value.length) {
        const newHash = value.reduce<SelectHash>((acc, val) => {
          acc[val] = true;
          return acc;
        }, {});
        this.selectedOptionsHash = newHash;
      }
    } else {
      const value = this.value as SelectValue;
      if (isDefined(value) && value !== '') {
        this.selectedOptionsHash[value] = true;
      }
    }

    this.setState({ selectedOptions });
  };

  applySelectedOptions = () => {
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
    delete this.selectedOptionsHash[value];
    this.setState(
      (state) => ({
        selectedOptions: state.selectedOptions.filter((v) => v.value !== value)
      }),
      () => !this.props.actions && this.applySelectedOptions()
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
      () => !this.props.actions && this.applySelectedOptions()
    );
  };

  handleClickOption = (option: SelectOption) => {
    if (this.isSelected(option.value)) {
      if (this.props.multiple) {
        this.unselect(option.value);
      } else {
        this.closeOptions();
      }
    } else {
      this.select(option);
    }
  };

  render() {
    const {
      marker,
      actions,
      search,
      options,
      multiple,
      id,
      name,
      placeholder,
      className
    } = this.props;
    const { selectedOptions, open, filter } = this.state;
    const { display } = this;

    const optionsToRender = options.filter((option) =>
      replaceSpecialCharacters(option.label.toLowerCase()).includes(
        replaceSpecialCharacters(filter.toLowerCase())
      )
    );

    return (
      <div
        ref={this.ref}
        className={twMerge(classNames('select'), className)}
        role='combobox'
      >
        <div className='container relative'>
          <select
            className='w-0 h-0 opacity-0 absolute top-0 left-0'
            {...{ id, name, multiple, placeholder }}
            value={
              selectedOptions.length > 1
                ? selectedOptions.map(({ value }) => String(value))
                : selectedOptions[0]?.value
            }
          ></select>
          <button
            className={twMerge(
              classNames(
                'input display group flex items-center justify-between text-left',
                { focus: open },
                {
                  placeholder: !display
                }
              )
            )}
            onClick={this.toggleOptions}
            type='button'
          >
            <span className='flex-1 text-ellipsis overflow-hidden whitespace-nowrap'>
              {display || placeholder}
            </span>
            <FiChevronDown
              // strokeWidth='1.5'
              className={classNames(
                'justify-self-end text-neutral-2 transition-all group-focus-within:text-accent-3',
                {
                  'text-accent-3 rotate-180': open
                }
              )}
            />
          </button>
          <div
            className={classNames(
              'select-content bg-dark z-[1] absolute left-0 top-[calc(100%+2px)] w-full opacity-100 block border border-neutral-2 rounded',
              {
                'opacity-0 hidden': !open
              }
            )}
          >
            {search && (
              <div className='search flex overflow-hidden'>
                <input
                  className='flex-1 py-3 px-5 border-none outline-none'
                  type='text'
                  onChange={(e) => this.setState({ filter: e.target.value })}
                  placeholder='Pesquise aqui...'
                />
              </div>
            )}
            <ul
              className={classNames(
                'options bg-neutral-1 cursor-pointer w-full h-fit max-h-36 flex flex-col gap-1 overflow-y-auto p-3',
                { 'pb-1': actions }
              )}
            >
              {optionsToRender.map((option) => {
                const { value, label } = option;
                const key = `Option-${value}`;
                const isSelected = this.isSelected(option.value);
                return (
                  <li
                    key={key}
                    className={classNames(
                      'option flex items-center justify-between gap-2 text-sm py-3 px-2 rounded relative transition-all hover:bg-accent-1',
                      { 'bg-primary-1': isSelected }
                    )}
                    onClick={() => this.handleClickOption(option)}
                    role='option'
                  >
                    <span>{label}</span>
                    {marker && <Checkbox checked={isSelected} />}
                  </li>
                );
              })}
              {optionsToRender.length === 0 && filter.length > 0 && (
                <li className='text-sm'>Nenhuma opção foi encontrada</li>
              )}
            </ul>
            {actions && (
              <div className='actions bg-neutral-1 border-t border-neutral-2 py-0 px-5 h-10 flex justify-end items-center gap-4'>
                <Button onClick={this.cancel} clear sm className='text-md'>
                  Cancelar
                </Button>
                <Button
                  onClick={this.applySelectedOptions}
                  primary
                  sm
                  className='text-md'
                >
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
