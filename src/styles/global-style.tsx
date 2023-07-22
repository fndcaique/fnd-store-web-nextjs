import { createGlobalStyle } from 'styled-components';
import { Colors } from './colors';

const GlobalStyle = createGlobalStyle`
  :root {
    --primary-1: ${Colors['primary-1']};
    --primary-2: ${Colors['primary-2']};
    --primary-3: ${Colors['primary-3']};
    --primary-4: ${Colors['primary-4']};
    --primary-5: ${Colors['primary-5']};
    --primary: ${Colors['primary']};

    --neutral-1: ${Colors['neutral-1']};
    --neutral-2: ${Colors['neutral-2']};
    --neutral-3: ${Colors['neutral-3']};
    --neutral-4: ${Colors['neutral-4']};
    --neutral-5: ${Colors['neutral-5']};
    --neutral: ${Colors['neutral']};

    --accent-1: ${Colors['accent-1']};
    --accent-2: ${Colors['accent-2']};
    --accent-3: ${Colors['accent-3']};
    --accent-4: ${Colors['accent-4']};
    --accent-5: ${Colors['accent-5']};
    --accent: ${Colors['accent']};

    --danger-1: ${Colors['danger-1']};
    --danger-2: ${Colors['danger-2']};
    --danger-3: ${Colors['danger-3']};
    --danger-4: ${Colors['danger-4']};
    --danger-5: ${Colors['danger-5']};
    --danger: ${Colors['danger']};

    --success-1: ${Colors['success-1']};
    --success-2: ${Colors['success-2']};
    --success-3: ${Colors['success-3']};
    --success-4: ${Colors['success-4']};
    --success-5: ${Colors['success-5']};
    --success: ${Colors['success']};

    --warning-1: ${Colors['warning-1']};
    --warning-2: ${Colors['warning-2']};
    --warning-3: ${Colors['warning-3']};
    --warning-4: ${Colors['warning-4']};
    --warning-5: ${Colors['warning-5']};
    --warning: ${Colors['warning']};
  }

  html,
  body {
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    background-color: ${Colors.dark};
    color: ${Colors.light};
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
  }
`;

export default GlobalStyle;
