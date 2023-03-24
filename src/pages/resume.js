import React from 'react';
import { graphql } from 'gatsby';

import resumeLink from '~src/components/resume';

const ResumePage = () => {
    if (typeof window !== 'undefined') {
        window.location.replace(resumeLink);
    }

    // Need to return something for SSR.
    return null;
};

export default ResumePage;
