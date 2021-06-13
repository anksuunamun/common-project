import React, {useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../m2-bll/store';
import {createCardsPackTC, deleteCardsPackTC, fetchPacksTC, updateCardsPackTC} from './packs-reducer';
import {setSearchValueAC} from '../search/filter-reducer';
import Search from '../search/Search';
import styles from './Packs.module.scss';
import {Preloader} from '../common/preloader/Preloader';
import {CardsPackCreateType, PackType} from '../../m3-dal/packAPI';
import Modal from '../../../n2-features/f2-modals/modal/Modal';
import {TableContainer} from '../common/table/TableContainer';
import {PaginatorContainer} from '../common/paginator/PaginatorContainer';
import {SuperDoubleRangeContainer} from '../common/super-double-range/SuperDoubleRangeContainer';


export const Packs: React.FC = () => {

    //data from redux
    const cardPacksTotalCount = useSelector<AppRootStateType, number>(state => state.packs.cardPacksTotalCount)
    const page = useSelector<AppRootStateType, number>(state => state.packs.page)
    const pageCount = useSelector<AppRootStateType, number>(state => state.packs.pageCount)
    const packs = useSelector<AppRootStateType, Array<PackType>>(state => state.packs.cardPacks)
    const myId = useSelector<AppRootStateType, string | null>(state => state.profile.userData._id)
    const searchName = useSelector<AppRootStateType, string>(state => state.filter.search)
    const minFilter = useSelector<AppRootStateType, number>(state => state.filter.min)
    const maxFilter = useSelector<AppRootStateType, number>(state => state.filter.max)
    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized);
    const dispatch = useDispatch()

    const [id, setId] = useState<null | string>(null)
    const [showEditModal, setShowEditModal] = useState<boolean>(false);
    const count = id === myId ? cardPacksTotalCount : 8

    useEffect(() => {
        dispatch(fetchPacksTC({pageCount: count, user_id: id}))
    }, [dispatch, count, id])

    const titles = useMemo(() => ['Name', 'Cards', 'LastUpdate', 'Created By', 'Actions'], []);
    // const filterPacks = useMemo(() => {
    //     return packs && id ? packs.filter(p => p.user_id === id) : packs
    // }, [packs, id])


    const addCardsPack = (name: string) => {
        let cardsPack: Partial<CardsPackCreateType> = {
            name
        }
        dispatch(createCardsPackTC(cardsPack))
    }
    const deleteCardsPack = (id: string) => {
        dispatch(deleteCardsPackTC(id))
    }
    const updateCardsPackName = (id: string, packName: string) => {
        dispatch(updateCardsPackTC(id, packName))
    }
    const pageClickPacksHandler = (page: number) => {
        dispatch(fetchPacksTC({page}))
    }

    const pagesCountPacksChange = (pageCount: number) => {
        dispatch(fetchPacksTC({pageCount}))
    }
    const getPacksWithFilters = () => {
        dispatch(fetchPacksTC({packName: searchName, min: minFilter, max: maxFilter}))
    }


    if (!packs) {
        return <Preloader/>
    }
    if (!isInitialized) {
        return <Preloader/>
    }

    return (
        <div className={styles.packsContainer}>
            <div className={styles.filtersBlock}>
                <div>
                    <h3>Show packs cards</h3>
                    <div className={styles.buttonsBlock}>
                        <button onClick={() => setId(myId)}
                                className={id ? `${styles.activeButton}` : `${styles.inactiveButton}`}>
                            My
                        </button>
                        <button onClick={() => setId(null)}
                                className={id ? `${styles.inactiveButton}` : `${styles.activeButton}`}>
                            All
                        </button>
                    </div>
                </div>
                <div>
                    <h3>Number of cards</h3>
                    <div className={styles.range}>
                        <SuperDoubleRangeContainer/>
                    </div>
                </div>
            </div>
            <div className={styles.packsBlock}>
                <h3>Packs list</h3>
                <div className={styles.searchBlock}>
                    <div className={styles.search}>
                        <Search setSearch={value => dispatch(setSearchValueAC(value))}/>
                    </div>
                    <div className={styles.buttons}>
                        <button onClick={() => getPacksWithFilters()}>search</button>
                        <button onClick={() => setShowEditModal(true)}>add</button>
                    </div>
                </div>
                <TableContainer packs={packs}
                                deleteCallback={deleteCardsPack}
                                updateCardsPackCallback={updateCardsPackName}
                                titles={titles}
                                type="pack"
                />
                <PaginatorContainer pagesCountChange={pagesCountPacksChange}
                                    pageClickHandler={pageClickPacksHandler}
                                    totalCount={cardPacksTotalCount}
                                    page={page}
                                    pageCount={pageCount}
                />
            </div>
            {showEditModal && <Modal childrenHeight={233}
                                     childrenWidth={400}
                                     onSaveClick={(value) => {
                                         addCardsPack(value);
                                         setShowEditModal(false);
                                     }}
                                     onModalClose={() => setShowEditModal(false)}
                                     type={'input'}
                                     header={'Add new pack'}
                                     buttonTitle={'Save'}
                                     inputTitle={'Name pack'}/>}
        </div>
    );
}

