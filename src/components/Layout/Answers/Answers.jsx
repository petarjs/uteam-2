import { useState, useEffect } from 'react';

import arrowDown from '../../../images/chevron-down-outline.svg';
import arrowUp from '../../../images/chevron-up-outline.svg';
import ModalUI from '../Modal/ModalUI';

import classes from './Answers.module.scss';
import AnswersForm from './AnswersForm';

import usePagination from 'hooks/usePagination';
import { getCompany } from 'services/company';
import { getUserStats, getProfileId } from 'services/getUser';
import { useGetQuestionsQuery } from 'services/questionApi';

const Answers = () => {
  const [profileId, setProfileId] = useState(0);
  const [companyName, setCompanyName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data: { data: questions },
  } = useGetQuestionsQuery();

  useEffect(() => {
    const getProfileData = async () => {
      try {
        const userStats = await getUserStats();
        const profileId = await getProfileId(userStats.id);
        const company = await getCompany(profileId);

        setProfileId(profileId);
        setCompanyName(company?.data[0]?.attributes?.name);
      } catch (err) {
        console.error(`${err.message},  💥🤯`);
      }
    };

    getProfileData();
  }, []);

  const { firstContentIndex, lastContentIndex, nextPage, prevPage, page, totalPages } =
    usePagination({
      contentPerPage: 1,
      count: questions?.length,
    });

  return (
    <>
      <main className={classes.answers}>
        <h2 className={classes.answers__heading}>{companyName}</h2>
        {questions?.slice(firstContentIndex, lastContentIndex).map((question) => (
          <div className={classes.answers__content} key={question.id}>
            <div className={classes.answers__arrows}>
              <img src={arrowUp} alt="Arrow Up" />
              <span>
                {page}/{totalPages}
              </span>
              <img src={arrowDown} alt="Arrow Down" />
            </div>
            <AnswersForm
              data={{ question, profileId, page, totalPages, prevPage, nextPage, setIsModalOpen }}
            />
          </div>
        ))}
        {isModalOpen && <ModalUI onClose={setIsModalOpen} />}
      </main>
    </>
  );
};

export default Answers;
