import React from 'react'
import PropTypes from 'prop-types'
import { ProductPageTemplate } from '../../templates/product-page'

const ProductPagePreview = ({ entry, getAsset }) => {
  const entryPricingPlans = entry.getIn(['data', 'areas'])
  const areas = entryPricingPlans ? entryPricingPlans.toJS() : []

  return (
    <ProductPageTemplate
      image={getAsset(entry.getIn(['data', 'image']))}
      heading={entry.getIn(['data', 'heading'])}
      description={entry.getIn(['data', 'description'])}
      areas={areas}
    />
  )
}

ProductPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  getAsset: PropTypes.func,
}

export default ProductPagePreview
