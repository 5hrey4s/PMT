import ReactOnRails from 'react-on-rails';
import { ProjectsList } from '../bundles/Projects/components/Projects';
import { HelloWorld } from '../bundles/HelloWorld/HelloWorld';
import { ProjectDetails } from '../bundles/Projects/components/project-details';
import { ProjectForm } from '../bundles/Projects/components/Projects';
import { ProjectPage } from '../bundles/Projects/components/Projects';
// This is how react_on_rails can see the HelloWorld in the browser.
ReactOnRails.register({
  HelloWorld,
});

ReactOnRails.register({ ProjectsList })

ReactOnRails.register({ ProjectDetails })

ReactOnRails.register({ ProjectPage })

ReactOnRails.register({ ProjectForm })

import Navbar from '../bundles/Home/navbar';
// This is how react_on_rails can see the HelloWorld in the browser.
ReactOnRails.register({
  Navbar,
});
