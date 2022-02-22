import { useParams } from 'react-router-dom';

function PendingApproval() {
  const params = useParams();

  return <p>{params.pendingId}</p>;
}

export default PendingApproval;
