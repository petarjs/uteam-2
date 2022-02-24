import { ArrowBackIcon } from '@chakra-ui/icons';
import { Button } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';

function GoBack() {
  return (
    <div>
      <Link to="/pending" className="invoice__go-back">
        <Button leftIcon={<ArrowBackIcon />} colorScheme="yellow" variant="outline" mb="1rem">
          Go Back
        </Button>
      </Link>
    </div>
  );
}

export default GoBack;
