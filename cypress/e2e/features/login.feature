Feature: Login Member
  As a credit union user
  I want to login into Member page


  @Login @Member @Magic
  Scenario Outline: Wrong Password
    When I navegate into member module
    When I sign in with user "<username>"
    When I use password "<wrongPassword>"
    Then I see error message "<message>" password incorrect

    Examples: 
      | username | wrongPassword     |message |
      | jcypress |            232323 |Wrong password|
