import React from 'react';
import { connect } from 'react-redux';
import './collection.styles.scss';
import CollectionItem from '../../components/collection-item/collection-item.component';
import { selectCollection } from '../../redux/shop/shop.selectors';


const CollectionPage  = ({collection }) => {
    const {title,items} = collection;
    return(
    <div className='collection-page'>
        <h2 className='title'>{title}</h2>
        <h2 className='items'>{
            items.map(item=><CollectionItem key={item.id} item={item}/>)
        }</h2>

    </div>
)
}


//ownprops are the props of the copoennt we are wrapping into our map
const mapStateToProps = (state,ownProps) => ({
    collection: selectCollection(ownProps.match.params.collectionId)(state)
})
export default connect(mapStateToProps)(CollectionPage)