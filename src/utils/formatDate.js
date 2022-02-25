// const local = navigator.language; // Get Local

const formatDate = (dateString) => {
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };

  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', options).format(date);
};

export default formatDate;
