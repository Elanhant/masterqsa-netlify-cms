import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import { SectionHeader } from '../components/core/Headers'
import CallToAction from '../components/callToAction/CallToAction'
import ContactForm from '../components/contact/ContactForm'

export const ContactPageTemplate = ({ title, address, phone, email, formTitle, image }) => {
  const backgroundImage = image ? `url(${
    !!image.childImageSharp
      ? image.childImageSharp.fluid.src
      : image
  })` : ''

  return (
    <React.Fragment>
      <div
        className="full-width-image margin-top-0"
        style={{
          // height: '587px',
          height: 'auto',
          padding: '7rem 0 8rem',
          backgroundImage: `linear-gradient(rgb(40, 89, 226), rgb(40, 89, 226)) ${backgroundImage}`,
          backgroundPosition: `center 40px`,
          backgroundAttachment: `fixed`,
          backgroundSize: 'contain',
        }}
      >
        <div className="container has-text-white has-text-centered">
          <SectionHeader
            className="has-text-centered"
            style={{ maxWidth: '326px', margin: '0 auto 5rem' }}
          >
            {title}
          </SectionHeader>
          <div>
            <address style={{ marginBottom: '6rem' }} className="is-size-5">
              {address}<br/>
              <a href={`tel:${phone}`} className="has-text-white">{phone}</a><br/>
              <a href={`mailto:${email}`} className="has-text-white">{email}</a>
            </address>
            <div className="is-size-4 has-text-weight-semibold" style={{ maxWidth: '374px', margin: '0 auto' }}>
              {formTitle}
            </div>
          </div>
        </div>
      </div>
      <div className="contactForm">
        <ContactForm />
      </div>
      <div className="section">
        <div className="container">
          <CallToAction />
        </div>
      </div>
    </React.Fragment>
  )
}

ContactPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  formTitle: PropTypes.string.isRequired,
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
}

const ContactPage = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <ContactPageTemplate
        title={post.frontmatter.title}
        address={post.frontmatter.address}
        phone={post.frontmatter.phone}
        email={post.frontmatter.email}
        formTitle={post.frontmatter.formTitle}
        address={post.frontmatter.address}
        image={post.frontmatter.image}
      />
    </Layout>
  )
}

ContactPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default ContactPage

export const contactPageQuery = graphql`
  query ContactPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        address
        phone
        email
        formTitle
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
