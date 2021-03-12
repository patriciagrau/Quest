export const grammar = `
<grammar root="command">
<rule id="command">
  <ruleref uri="#please"/>
  <ruleref uri="#mixing"/>
  <tag> out=rules.mixing;
           out=rules.mixing;</tag>
</rule>
<rule id="please">
  <item repeat="0-1">
    please
  </item>
</rule>
<rule id="action1">
    <item>turn <ruleref uri="#onff"/><tag> out=rules.onff </tag> </item>
</rule>
<rule id="action2">
  <one-of>
    <item>open<tag> out='open'; </tag></item>
    <item>close<tag> out='close'; </tag></item>
  </one-of>
</rule>
<rule id="onff">
  <item repeat="0-1">
  <one-of>
    <item>on<tag> out='on'; </tag></item>
    <item>off<tag> out='off'; </tag></item>
  </one-of>
  </item>
</rule>
<rule id="object1">
  the
  <one-of>
     <item>light<tag> out='light'; </tag></item>
     <item>heat<tag> out='heat'; </tag></item>
     <item>AC<tag> out= 'air conditioning'; </tag></item>
     <item>air conditioning<tag> out='air conditioning'; </tag></item>
  </one-of>
</rule>
<rule id="object2">
  the
  <one-of>
     <item>window<tag> out='window'; </tag></item>
     <item>door<tag> out='door'; </tag></item>
  </one-of>
</rule>
<rule id="mixing">
  <one-of>
   <!-- OPTION 1 -->
      <item>
      <ruleref uri="#action1"/>
      <ruleref uri="#object1"/>
      <ruleref uri="#onff"/>
      <tag> out.action=rules.action1?rules.action1:rules.onff;
           out.object=rules.object1;</tag>
      </item>

   <!-- OPTION 2 -->
      <item>
      <ruleref uri="#action2"/>
      <ruleref uri="#object2"/>
      <tag> out.action=rules.action2;
           out.object=rules.object2;</tag>
      </item>
  </one-of>
</rule>
</grammar>
`
