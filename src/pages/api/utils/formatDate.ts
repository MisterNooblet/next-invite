const formatDate = (date: string): string => {
  const newDate = new Date(date);
  const options = { month: 'long', day: 'numeric', year: `numeric` } as const;
  const formatter = new Intl.DateTimeFormat('en-US', options);
  const formattedDate = formatter.format(newDate).toUpperCase();
  return formattedDate;
};

export default formatDate;
