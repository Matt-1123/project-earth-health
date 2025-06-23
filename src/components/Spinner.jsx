import MoonLoader from 'react-spinners/MoonLoader'

const Spinner = ({ loading }) => {
  return (
    <MoonLoader
      color='#90b36d'
      loading={loading}
      cssOverride={styleOverride}
      size={64}
    />
  );
};

const styleOverride = {
  display: 'block',
  margin: '100px auto',
};

export default Spinner
