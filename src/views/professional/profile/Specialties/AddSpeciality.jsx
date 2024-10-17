import ArrowDownwardOutlinedIcon from '@mui/icons-material/ArrowDownwardOutlined';
import Frame from '../../../../assets/images/Frame.png';
import { selectUser } from '../../../../redux/slices/userSlice';
import { useSelector } from 'react-redux';

export const AddSpeciality = ({ specialties }) => {
  let User = useSelector(selectUser);
  return (
    <>
      {specialties.data.length === 0 ? (
        <>
          <div style={{ backgroundColor: '#fff', padding: '40px 0 40px 0' }}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
              }}
            >
              <img
                src={Frame}
                style={{ height: '236px', width: '241px', opacity: '30%' }}
                alt=''
                srcset=''
              />
              <h1
                style={{
                  fontSize: '30px',
                  fontWeight: '400',
                  textAlign: 'center',
                  color: '#D9D9D9',
                }}
              >
                Add New Specialties
              </h1>
              <p
                style={{
                  fontSize: '14px',
                  fontWeight: '400',
                  textAlign: 'center',
                  color: '#BFBFBF',
                  padding: '10px 0 20px 0',
                }}
              >
                Сhoose your Speciality
              </p>
              <button
                // onClick={handleSpecialityOpen}
                style={{
                  backgroundColor: '#2561B0',
                  padding: '8px 30px 8px 30px',
                  borderRadius: '4px',
                  textAlign: 'center',
                  fontSize: '16px',
                  fontWeight: '400',
                  border: '1px solid #2561B0',
                  color: '#fff',
                }}
              >
                Add New Speciality
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div style={{ width: '100%', height: 'auto' }}>
            <div
              style={{
                padding: '20px 24px',
                backgroundColor: 'rgb(245, 245, 245)',
                borderBottom: '1px solid #D9D9D9',
              }}
            >
              <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                <button
                  // onClick={handleSpecialityOpen}
                  style={{
                    borderRadius: '4px',
                    padding: '10px 20px',
                    border: '2px solid #2561B0',
                    backgroundColor: '#fff',
                    marginRight: '10px',
                  }}
                >
                  Add Speciality
                </button>
                <button
                  // onClick={() => {
                  //   if (isclicked) {
                  //     handleDeleteOpen();
                  //   }
                  // }}
                  // disabled={!isclicked}
                  style={{
                    borderRadius: '4px',
                    padding: '10px 20px',
                    // border: `1px solid ${isclicked ? '#2561B0' : '#D9D9D9'}`,
                    // backgroundColor: `${isclicked ? '#fff' : '#F5F5F5'}`,
                    marginRight: '10px',
                    // color: `${isclicked ? '#000' : '#bcbcbc'} `,
                  }}
                >
                  Delete Speciality
                </button>
                <button
                // disabled={!isclicked}
                // onClick={() => {
                //   User.category_id === 1
                //     ? setEditAssistant(true)
                //     : User.category_id === 2
                //     ? setEditHyginist(true)
                //     : User.category_id === 3
                //     ? setEditOffice(true)
                //     : setEditDestist(true);
                // }}
                // style={{
                //   borderRadius: '4px',
                //   padding: '10px 20px',
                //   border: `1px solid ${isclicked ? '#2561B0' : '#D9D9D9'}`,
                //   backgroundColor: `${isclicked ? '#fff' : '#F5F5F5'}`,
                //   marginRight: '10px',
                //   color: `${isclicked ? '#000' : '#bcbcbc'}`,
                // }}
                >
                  Edit Questionnaire
                </button>
              </div>
            </div>
            <div
              style={{
                margin: '40px 24px 20px 24px',
                paddingTop: '10px',
                paddingBottom: '0',
                backgroundColor: '#fff',
                border: '1px solid rgb(217, 217, 217)',
                borderRadius: '12px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flex: 1,
                  width: '100%',
                  padding: '2px 10px 2px 30px',
                  fontWeight: 'semi-bold',
                  fontSize: '14px',
                  fontFamily: 'Roboto',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    flex: 1,
                  }}
                >
                  <ArrowDownwardOutlinedIcon
                    style={{
                      fontSize: '20px',
                      color: '#8C8C8C',
                      marginRight: '4px',
                      fontWeight: '500',
                    }}
                  />
                  <p style={{ fontWeight: '500' }}>Category</p>
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    flex: 1,
                  }}
                >
                  <ArrowDownwardOutlinedIcon
                    style={{
                      fontSize: '20px',
                      color: '#8C8C8C',
                      marginRight: '4px',
                      fontWeight: '500',
                    }}
                  />
                  <p style={{ fontWeight: '500' }}>Sub-Category</p>
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    flex: 1,
                  }}
                >
                  <ArrowDownwardOutlinedIcon
                    style={{
                      fontSize: '20px',
                      color: '#8C8C8C',
                      marginRight: '4px',
                      fontWeight: '500',
                    }}
                  />
                  <p style={{ fontWeight: '500' }}>Status</p>
                </div>
              </div>
              <hr
                style={{ marginTop: '15px', marginBottom: '0', padding: 0 }}
              />
              <div>
                {specialties.data.map((item, index) => (
                  <div
                    // onClick={() => {
                    //   if (isclicked && Index === index) {
                    //     setisclicked(!isclicked);
                    //     setIndex(-1);
                    //   } else {
                    //     setisclicked(true);
                    //     setIndex(index);
                    //   }
                    // }}
                    style={{
                      paddingTop: '12px',
                      margin: 0,
                      // backgroundColor: `${
                      //   isclicked && Index === index ? '#D7E8FF' : '#fff'
                      // }`,
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        flex: 1,
                        width: '100%',
                        padding: '0px 10px 2px 30px',
                        fontWeight: 'semi-bold',
                        fontSize: '14px',
                        fontFamily: 'Roboto',
                        marginLeft: '24px',
                        paddingBottom: '12px',
                      }}
                    >
                      {/* <p style={{ flex: 1 }}>
                        {Category
                          ? Category[User.category_id - 1]?.name
                          : 'Hii'}
                      </p> */}
                      <p style={{ flex: 1 }}>{item.SubCategory}</p>
                      <div style={{ flex: 1 }}>
                        <button
                          style={{
                            border: '1px solid #75B0FA',
                            borderRadius: '16px',
                            backgroundColor: '#4A93F0',
                            fontSize: '13px',
                            fontFamily: 'Roboto',
                            width: '72px',
                            height: '29px',
                            opacity: '80%',
                            fontWeight: '500',
                          }}
                        >
                          {item.status}
                        </button>
                      </div>
                    </div>
                    <hr style={{ padding: 0, margin: 0 }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
