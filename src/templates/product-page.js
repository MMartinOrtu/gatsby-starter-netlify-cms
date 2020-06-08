import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Pricing from '../components/Pricing'

export const ProductPageTemplate = ({
  image,
  heading,
  description,
  areas,
}) => (
  <div className="content">
    <div
      className="full-width-image-container margin-top-0"
      style={{
        backgroundImage: `url(${
          !!image.childImageSharp ? image.childImageSharp.fluid.src : image
        })`,
      }}
    >
    </div>
    <section className="section section--gradient">
      <div className="container">
        <div className="section">
          <div className="columns">
            <div className="column is-12">
              <div>
                <h3
                  style={{ textAlign: 'center', color: '#82B7B9'}} className="has-text-weight-semibold is-size-2"
                >{heading}</h3>
                <p className="product-text">{description}</p>

              </div>
            </div>
          </div>
          <div 
            style={{ justifyContent: 'center'}}
            className="columns">
            <div className="column is-12 product-container">
              <div
                className="product-header"
                style={{
/*                   backgroundImage: `url(${
                    !!pricing.image.childImageSharp ? pricing.image.childImageSharp.fluid.src : pricing.image
                  })`, */
                  filter: 'grayscale(0.3)',
                }}
              >
                <h2 
                  style={{ color: 'white', margin: '0', fontSize: 'bold'}}
                  className="is-size-1">
                  {areas.area}
                </h2>
              </div>
              <p className="is-size-5 product-text">{areas.description}</p>
              <Pricing data={areas.plans} />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
)

ProductPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  heading: PropTypes.string,
  description: PropTypes.string,
  intro: PropTypes.shape({
    blurbs: PropTypes.array,
  }),
  main: PropTypes.shape({
    heading: PropTypes.string,
    description: PropTypes.string,
    image1: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    image2: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    image3: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  }),
  testimonials: PropTypes.array,
  fullImage: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  areas: PropTypes.shape({
    area: PropTypes.string,
    description: PropTypes.string,
    plans: PropTypes.array,
  }),
}

const ProductPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark

  return (
    <Layout>
      <ProductPageTemplate
        image={frontmatter.image}
        heading={frontmatter.heading}
        description={frontmatter.description}
        areas={frontmatter.areas}
      />
    </Layout>
  )
}

ProductPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default ProductPage

export const productPageQuery = graphql`
  query ProductPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        heading
        description
        areas {
          area
          description
          image {
            childImageSharp {
              fluid(maxWidth: 2048, quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          plans {
            description
            items
            plan
            price
          }
        }
      }
    }
  }
`
