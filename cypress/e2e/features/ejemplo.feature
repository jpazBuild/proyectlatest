Feature: searching something in google

  @feature("searching")
  Scenario Outline: Navigate google
    When I navegate into google
    When I search "<word>"
    Then validate the word "<wordvalidate>" appears in the google search

    Examples: 
      | word          | wordvalidate  |
      | qa automation | qa automation |
      | qa automation | scrum         |
