# World Happiness Visualizations
by Bryan Domogalla, Ellen Hsu, Rachel Hunter

## Project Summary
The World Happiness Report is a survey of global happiness reported by the United Nations (from 2015-2019). The overall Happiness Score includes measures of: Family, Health (Life Expectancy), Freedom, Trust (Government Corruption), Generosity, and Dystopia Residual - which is a residual to account for the difference in the sum of all the factors compared to the Happiness Score. 

We built interactive visualizations to show how these factors compare to happiness scores for each country and region; how the factors correlate to one another; and a world map with all rankings and scores on a scale.

### Original Data Source
https://www.kaggle.com/unsdsn/world-happiness

### Live Site
https://ellemonke.github.io/full-stack-project/

### Sitemap
- Happiness Score v. Happiness Factor (bubble chart)
- Correlations Between Happiness Factors (correlogram)
- World Map (Google Charts)
- Summary Report

### Process
1. **Data Analysis**
    - We used Python (plus Pandas, Numpy and SciPy) in Jupyter Notebooks to prepare the data as CSV files to feed into our charts. This included standardizing columns, parsing factors and years into digestible CSVs, and creating correlations tables. 
2. **Chart Creation**
    - The bubble chart and correlogram of were created with JavaScript plus D3.
    - The world map was created with JavaScript, D3, and a Google Charts library.
3. **Front-End/Web Design**
    - The website template was created using HTML, Bootstrap, and CSS.



