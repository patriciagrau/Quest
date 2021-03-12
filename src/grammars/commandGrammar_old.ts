export const grammar = `
<grammar root="command">
<rule id="command">
  <ruleref uri="#action"/>
  <ruleref uri="#object"/>
  <tag> new Object(); out.action=rules.action;
           out.object=rules.object;</tag>
</rule>
<rule id="action">
  <one-of>
    <item>turn <ruleref uri="#onff"/> <tag> out=rules.onff </tag> </item>
    <item>open<tag> out='open'; </tag></item>
    <item>close<tag> out='close'; </tag></item>
  </one-of>
</rule>
<rule id="onff">
  <one-of>
    <item>on<tag> out='on'; </tag></item>
    <item>off<tag> out='off'; </tag></item>
  </one-of>
</rule>
<rule id="object">
  the
  <one-of>
     <item>light<tag> out='light'; </tag></item>
     <item>heat<tag> out='heat'; </tag></item>
     <item>AC<tag> out= 'air conditioning'; </tag></item>
     <item>air conditioning<tag> out='air conditioning'; </tag></item>
     <item>window<tag> out='window'; </tag></item>
     <item>door<tag> out='door'; </tag></item>
  </one-of>
</rule>
</grammar>
`
