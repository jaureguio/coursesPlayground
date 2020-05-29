# Design Systems

## Foundations of Design Systems

### Design Systems & Why They Matter

There is no industry standard definition for what a Design System is. From a designer point of view, he/she would typically refer to foundational elements like UI kit, color, typography grid, iconography. On the other hand, when an engineer is discussing about a Design System, he/she is most likely referring to the Component library and the style guide.

- A Design System is all these things previously mentioned. It incorporates pieces from design and engineering, all wrapped up.

_Why They Matter?_

1. Accessibility.
   - Everyone, regardless of circumstance, should be able to achieve the same results from your application (not necessarily in the same way, but we have to provide the tools for it to everyone). DS is going to ensure we have an accessible color palette, appropiate typescale and the ability to navigate/interact using the keyboard and assistance technologies.
2. Consistency.
   - Our product should look and feel like they're part of the same brand identity.
3. Trickle-down updates.
   - The style can be updated in one component within the system, and will propagate to each product.
4. Responsiveness.
   - Our web/native applications must account for different screen resolutions and devices.
5. Onboarding.
   - There is one place for new team members to go to get all of the information they need to get started. This way, when working with multiple teams, a developer can be changed from one to another without adaption time (up and going).
6. Flexibility.
   - A DS must serve a variety of use cases, while setting parameters on what exactly those use cases can be - different types of components that our engineers and designers can use. Multiple button sizes, status, etc. Providing boundaries on the flexibility doesn't restrict designers/engineers but it gives a set of tools they can employ.
7. Speed.
   - Once our DS has been stablished, time to production (design and build new features) is greatly reduced.

### Drawbacks of DS

- Time: DS take time to build.
- Evolution: a DS is never complete. It's a product serving products.
- Maintenance: a DS is a living, breathing product which has lifecycles and requires maintenance.
- Investment: we need designers, engineers, and product managers to ensure the success of the system. _Lack of adoption is one of the main reason of DS failure_.

### Team Structure

Teams are commonly composed of a design, product and engineering team.

1. Centralized Model.

- An entire team (design) is in charge of the DS.
- The team defines the foundations & identity of the system.
- Have complete veto power over the system.
- Manage & create the UI Kit, component library and style guide. Product team only consumes.

2. Distributed MOdel.

- No centralized core team. Usually applied when we cannot afford a completed dedicated team taking care of the DS.
- Built & maintained by the consuming teams. For example, the product team which is consuming the DS is also building it - this gives a sense of ownership and people get excited about something when they are the ones building it.
- Influenced by many vantage points (innovation and diversity)
- Less down time (system can still evolve even when part of the teams are not present because we have a lot of contributers).

3. Hybrid Model.

- Combines the centralized and distributed models. We have a core centralized team who is responsible for driving the system as a whole, but they still accept contribution from the larger ecosystem (internally ecosystem).
- Decisions are made quickly.

### Who are DS for?

> If a design system is by a company, then it's for the company. It might also be open source, but any ol' random developer who wants to use it isn't the target audience. \* Chris Coyer - CSS Tricks

### Three Pilars of Design Systems

#### Design Language

The set of standards and assets which guide the creation of a suite of products underneath a brand.

- The personality of a brand and its corresopnding desing assets. Brand identity will be putted into living breathing components and foundational elements.

1. Foundation: color, typography, grid, spacing, iconography, illustrations, motion.
2. UI Kit: buttons, text fields, modals, dropdowns, navigation, footer.

#### Component Library

Set of components which turn the desing language and UI kit into liviing, breathing code.Can be built with many different frameworks and libraries.

- Frameworks: Vue, React, Angular, Ember
- Technologies: CSS Pre-processors, CSS-in-JS, animation libraries, testing libraries.

#### Style Guide

The documentation for the design language, UI kit, and component library. Tells designers and engineers where to get assets, get up and running, get integrated, etc.

- Tecnologies: Storybook, Invision, Gatsby, React Styleguidist.

#### Building a DS

1. Define design principles.
2. Conduct a UI audit.
3. Create checklists.
4. Define workflows.

_Design principles_

They are the grounding values which drive the creation of the products. It encompass the question: What do you want the users to feel when using your product? Example design principle could be "Bold, optimistic and practical".

_UI Audit_

- Compile all components, in every variation and state, in one place. Group these components by functionality.
- Prioritize the components which have the highest impact on unification of your products and easily achievable.

  Question to ask when prioritazing:

  - Does this request embody our design principles?
  - Does this request require a lot of design/development effort?
  - Does this request come with high risk to the success of our product?
  - Does this request coincide with the product roadmap?
  - Does this request improve the user experience?
  - Are we confident with this request or will it need to be revisited in the near future?
  - Is this request technically feasible?

Whe can take this question and create some impact statements based off of them, creating metrics regarding adoption or opposition to the feature.

- _Adoption metrics_: metrics which indicate that a component has high priority (based on impact, identity, confidence).
- _Opposition metrics_: metrics which indicate that a component has lower priority (based on maintenance, risk, effort).

##### Calculating Priority

Sum the scores from our adapter and opposer questions, then find the mean score by dividing the number of questions for each metric.
We take these individual scores and find the mean across all survey participants.
These will become our (X,Y) coordinates which help us determine the priority of our components.

- Calculating individual scores:

  impact + identity + confidence = individual adapter total
  individual adapter total / # adapter questions = individual adapter

  maintenance + risk + effort = individual opposer total
  individual opposer total / # opposer questions = individual opposer

- Calculating mean scores

  individual adapter totals / # survey participants = adapter score
  individual opposer totals / # survey participants = opposer score

            (X, Y)
      (adapter, opposer)

Calculating priority in this way helps us answer questions about our design decisions when dealing with investors and stakeholders for example ("this is supper risky to do", "it will take too much time to develop", etc)

By visualizing the priority of each component on this prioritizing graph, we can easily determine what to spend time on.

                PRIORITY 3             |            PRIORITY 1
      Weak adapter / weak opposer      |   Strong adapter / weak opposer
                                       |
      Finish priority 1 and 2          |   Immediate adoption
      components before tackling       |
    ================================ 0 | 0 ==============================
               PARKING LOT             |            PRIORITY 2
        Weak adapter / strong opposer  |   Strong adapter / strong opposer
                                       |
         (keep in mind that no idea    |  Try to mitigate the opposition
          is a bad idea)               |  metrics prior to adapting

**Example**

Buttons will have a high impact because they'll unify our products underneath our brand identity.
But buttons also require a lot of maintenance and effort and might have to be re-visited several times before a finilized design is found.

_score_: (4, 4) of a 5 point axis scale ---> priority 1

#### Design System Checklist

##### Design Checklist

- Accessibility
  - Can all users, regardless of circumstance, use this component?
- Interaction
  - How should a component respond when a user interacts with it?
- Context
  - How and where should this component be used?
- Completion
  - Are all states, including neutral, hover, focus, and disables, defined?
- Content
  - What type of content does this component rely upon?
- Customization
  - Are aspects of this component customizable? If so, how?
- Screen Resolution
  - How does this component look on varying screen resolutions?

##### Development Checklist

- Accessibility
  - Can all users, regardless of circumstances, use this component?
- Responsiveness
  - Our components must respond to browser window resizing and varying screen resolutions.
- Completion
  - Does this component account for all aspects of the design?
- Customization
  - Have we implemented all of the customizable aspects of this component?
- Error Handling / Prop Validation
  - How do our components respond when something breaks?
- Browser Compatibility
  - Does this technologies we use work across all supported browsers or must we include polyfills?

#### Common Mistakes

- Starting for scale

While the ability to scale is good, building your components for scale can be a detriment. Only scale when needed.

- Education before building

Educating teams about our design system can negatively impact our rapport if there's nothing to use.

- Not discussing workflow

If we are going to be collaborating on a design system, it is important to come to terms on a working model.

- Not documenting decisions

Design systems require a lot of investment and will often have lots of eyes on them.
Documenting decisions will save us and our team the headache of having to explain to each stakeholder why we're doing something a certain way.

## Foundations of Design

### Color Overview

- Additive color mixing

Colors start black and become white as more red, blue, or green are added.

- Subtractive color mixing

Colors starts as white and as filters are added takes on the appearance of color (photos and magazines use substractive colors).

#### Color Types

1. Primary Colors: colors (blue, yellow and red) which cannot be created by combining other colors.
2. Secondary colors: colors that result from mixing two primary colors.
3. Tertiary colors: colors that are created by combining a secondary color with a primary color. There are six tertiary colors.

#### The Color Wheel

Color palettes can be form easily using a wheel representation of the colors.

- Monochromatic: monochromatic palettes are created by establishing variations on a shade of a single color.
- Complementary: complementary color palettes are created by selecting two colors directly opposite of each other on the color wheel.
- Analogous: analogous color palettes are created by selecting three colors which are side by side on the color wheel.
- Triadic: triadic color palettes are created by selecting three evenly-spaced colors from around the color wheel.

### Color Terminology

- Hue: any color on the color wheel.
- Saturation: the intensity or purity of a color.
- Shade: a shade is created by incorporating black to a base hue, which darkens the color.
- Tint: a tint is created by adding white to a base hue, which lighthens the color.
- Tone: a tone is cretaed by combining black or white (gray) with a base hue. Tones are subtle variations of the original color.

### Color Semantics

Color of our products can actually trigger emotional responses in our users!

- Red: relates to fire, violence, war, love, passion.
- Orange: relates to vibrant emotions, earth, autumn, change, movement, creativity.
- Yellow: happiness, sunshine, deceit, cowardice, cheer.
- Green: growth, renewal, abundance, envy, jealously.
- Blue: sadness, calmness, responsability, reliability, peace.
- Purple: luxury, royalty, wealth.
- Black: power, elegance, formality, evil, death, mystery.
- White: purity, cleanliness, virtue, goodness.
- Gray: moodiness, depression, conservative, formal, modern.
- Brown: dependability, reliability, earthiness.

### Color Values

#### Hex

The base-16 representation of a color where each value can range from 0-9 and A-F.

#### RGB

The additive color mixing model which allows you to create colors by mixing red, green, and blue light sources.

#### RGBA

Same as RGB but incorporates a fourth value, alpha which represents opacity.

#### CYMK

The subtractive color mixing model used in print design.

### Typography (terminology)

- _Ascender_: the piece of a letter which rises above the x-height.
- _Descender_: the piece of a letter which dips below the baseline.
- _Baseline_: the imaginary line on which most letters sit.
- _Capline_: the imaginary line that marks the upper boundary of capital letters and some lowercase letters' ascenders.
- _X-height_: height of the typeface's lowercase letters.
- _Tracking_: the uniform amounts of spacing between characters in a complete section of text.
- _Kerning_: the horizontal spacing between two consecutive characters.
- _Leading_: the vertical spacing between lines of text (from baseline to baseline).

### Fonts

- _Serif_: serif fonts have short lines or strokes on the open ends of letters (Times New Roman, Droid Serif, Playfair Display).
- _Sans-serif_: Sans-serif fonts, in contrast to serif fonts, do not have short lines or strokes on the open ends of letters (Helvetica, IBM Plex Sans, PT Sans). _Sans_ means "without" in french.
- _Monospaced_: monospaced fonts have letters and characters which occupy the same amount of horizontal space (Anonymous Pro, IBM Plex Mono, Roboto Mono).

#### Font Measurements

- Pixels: the units used by designers, however they shouldn't be used to define a type scale.
- Em: the unit of typography equal to the currently specified point-size.
- Rem: the unit of typography equal to the current ROOT font size in the page.

### Typescale

There are quite a few type scales: Major Third, Major second, Perfect Fourth, Golden Ratio, Perfect Fifth.

### Other Areas of Design

- Grid
- Spacing
- Accessibility
- Motion
- Iconography

## Designing Components with Figma

### Button States & Styles

- Solid Buttons

Solids buttons are buttons with a solid background fill. They're easily recognizable and a great choice for a primary button. Usually used as primary buttons because they drove the most attention. Square corners button tend to drive more user attention than rounded corners button.

- Ghost Buttons

Are buttons without a background fill; they only have an outline. Great candidate to be used as secondary buttons.

- Icon Buttons

Icon buttons have no label and are only an icon. Keep in mind that buttons and icons without a label are bad for accessibility and if a label cn be used it should.

#### Button Styles

- Border Radius

Rounded buttons are more playful than buttons with squared edges. Our button design should coincide with our brand identity.

- Drop Shadow

Drop shadows give our buttons elevation. We can add drop shadows on hover and focus states to indicate state changes.

- Labels

When choosing our label style, we need to be sure to place readability above all else (title case labels should be preferred to ease reading)

- Vertical/Horizontal Padding

We must ensure our buttons are large enough to be accessible and clickable on a mobile device (vertical: small 4px, default 8px, large 16px; horizontal: 32px).

Icon buttons may have min width defined as well.

## Developing Styled Components

### How to Apply CSS & Specificity

1. External CSS stylesheet with a link in the head HTML element.
2. Within the HTML file in a `<style>` tag
3. Inline on the HTML elements `<h1 style="margin-right: 4px">`

_CSS Specificity_

- Type selectors and pseudo-elements.
- Class selectors, attribute selectors and pseudo-classes.
- ID Selectors.

### Problems with CSS

- Styles slowly become decentralized and hard to remove or update.
- A lack of knowledge about CSS specificity leads to `!importants`.

### CSS-in-JS

JavaScript is used to style our components. When the components are parsed, CSS is generated and attached to the DOM.

## Animating Components

### Micro-interactions

Micro-interactions are small animations whose purpose is to delight the user by providing feedback in regards to a task or inform the user about the status of a process or task. Some benefits that micro-interactions brings to us as developers:

- Perceived performance

We can alter our user's sense of time with animations and this can work in our favor if our performance budget needs some refactoring.

- Task status

As a user's request is processing or as their data is loading, we can use a micro-interaction to inform them of its status.

- State change

If a use is filling out a form and incorrectly enters their password, we can use micro-interactions to illustrate that this form needs to be fixed prior to submission.

- Draw attention

Using micro-interactions to capture a user's attention and indicate that there is something of importance is a useful tool for on-boarding or to indicate someone is typing.

- Create habits

Social media applications are really good at getting their uses to form habits, and they do so with micro-interactions.

- Delight users

Micro-interactions can bring joy to our users by enhancing their experience.

#### Tips for building animations

- Accessibility: animations must be accessible.
- Intentionality: be intentional with the placement of the animation.
- Relatability: make the animation feel as if it is part of the real world.
- Performance: never make users wait for an animation.
