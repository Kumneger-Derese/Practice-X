const FormatDate = ({ date }) => {
  const formatedDate = new Date(date).toLocaleDateString();
  return <div className='inline-block'>{formatedDate}</div>;
};
export default FormatDate;
